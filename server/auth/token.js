import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

function generateAccessToken(id) {
    const expiresIn = '1 hour';

    const token = jwt.sign({}, process.env.AUTH_JWT_SECRET, {
        expiresIn: expiresIn,
        audience: process.env.AUTH_JWT_AUDIENCE,
        issuer: process.env.AUTH_JWT_ISSUER,
        subject: id.toString()
    });

    return token;
}

export default generateAccessToken;