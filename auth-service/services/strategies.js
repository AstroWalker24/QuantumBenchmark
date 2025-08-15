import passport from 'passport';
import dotenv from 'dotenv';
import User from '../models/User';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GithubStrategy } from 'passport-github2';

dotenv.config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async (_accessToken, _refreshToken, profile, done) => {
    try {
        const email = profile.emails?.[0]?.value?.toLowerCase();
        const existing = await User.findOne({ provider: 'google', providerId: profile.id }) || (email && await User.findOne({ email }));
        if (existing) {
            if (!existing.providerId) {
                existing.provider = 'google';
                existing.providerId = profile.id;
                await existing.save();
            }
            return done(null, existing);
        }
        const user = await User.create({
            email,
            name: profile.displayName,
            avatarUrl: profile.photos?.[0]?.value,
            provider: 'google',
            providerId: profile.id
        });
        done(null, user);
    }
    catch (error) {
        done(error);
    }
}));

passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
}, async (_accessToken, _refreshToken, profile, done) => {
    try {
        const email = profile.emails?.[0]?.value?.toLowerCase();
        const existing = await User.findOne({provider: 'github', providerId: profile.id}) || (email && await User.findOne({email}));
        if (existing) {
            if (!existing.providerId) {
                existing.provider = 'github';
                existing.providerId = profile.id;
                await existing.save();
            }
            return done(null, existing);
        }
        const user = await User.create({
            email,
            name: profile.displayName || profile.username,
            avatarUrl: profile.photos?.[0]?.value,
            provider: 'github',
            providerId: profile.id
        });
        done(null, user);
    }
    catch (error) {
        done(error);
    }
}));



