import { Router } from "express";
import bcrypt from 'bcryptjs';
import passport from "passport";
import User from '../models/User';
import { signAccessToken } from '../services/jwt';

const router = Router();

function setAuthCookie(res, token) {
    const isProd = process.env.NODE_ENV === 'production';
    res.cookie('access_token', token, {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? 'none' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
}

router.post('/signup', async (req, res) => {
    try {
        const { email, password, name } = req.body || {};
        if (!email || !password) {
            res.status(400).json({ error: 'Email and password are required' });
        }
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ error: 'Email already in use' });
        }
        const passwordHash = await bcrypt.hash(password, 12);
        const user = await User.create({ email, passwordHash, name, provider: 'local' });
        const token = signAccessToken({ id: user._id, email: user.email, name: user.name });
        setAuthCookie(res, token);
        res.json({ user: { id: user._id, email: user.email, name: user.name } });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body || {};
        const user = await User.findOne({ email });
        if (!user || !user.passwordHash) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) {
            return res.status(400).json({ error: 'Invalid Credentials' });
        }
        const token = signAccessToken({ id: user._id, email: user.email, name: user.name });
        setAuthCookie(res, token);
        res.json({ user: { id: user._id, email: user.email, name: user.name } });
    }
    catch {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/logout', (req, res) => {
    res.clearCookie('access_token', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax' });
    res.json({ ok: true });
});

router.get('/me', async (req, res) => {
    try {
        const token = req.cookies['access_token'];
        if (!token) {
            return res.json({ user: null });
        }
        const { id } = JSON.parse(
            Buffer.from(token.split('.')[1], 'base64').toString('utf-8')
        );
        const user = await User.findById(id).select('_id email name avatarUrl');
        res.json({ user });
    }
    catch {
        res.json({ user: null });
    }
});

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback',
    passport.authenticate('google',
        { session: false, failureRedirect: `${process.env.CLIENT_ORIGIN}/login?error=oauth` }
    ),
    (req, res) => {
        const token = signAccessToken({ id: req.user._id, email: req.user.email, name: req.user.name });
        setAuthCookie(res, token);
        res.redirect(`${process.env.CLIENT_ORIGIN}/dashboard`);
    }
);

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('github/callback',
    passport.authenticate('github', {
        session: false,
        failureRedirect: `${process.env.CLIENT_ORIGIN}/login?error=oauth`
    }),
    (req, res) => {
        const token = signAccessToken({ id: req.user._id, email: req.user.email, name: req.user.name });
        setAuthCookie(res, token);
        res.redirect(`${process.env.CLIENT_ORIGIN}/dashboard`);
    }
);

export default router;

