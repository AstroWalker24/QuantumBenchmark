import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const signAccessToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, {expiresIn: '7d'});
}

export const verifyAccessToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
}