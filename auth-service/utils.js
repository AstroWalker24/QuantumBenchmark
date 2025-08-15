import crypto from 'crypto';

const generateToken = (length = 64) => {
    const key = crypto.randomBytes(length).toString('hex');
    console.log(key);
    return key;
}

