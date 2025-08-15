import { verifyAccessToken } from "../services/jwt";

export function requireAuth(req, res, next) {
    const token = req.cookies['access_token'];
    if (!token) {
        res.status(401).json({error: 'Not Authenticated'});
    }
    try {
        const payload = verifyAccessToken(token);
        req.user = payload;
        next();
    }
    catch {
        return res.status(401).json({error: 'Invalid Token'});
    }
}