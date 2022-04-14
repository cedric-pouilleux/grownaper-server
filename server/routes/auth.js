import express from 'express';
import passportDefault from '../auth/google';
import generateAccessToken from "../auth/jwt-sign";

const router = express.Router();

router.get('/google',
    passportDefault.authenticate(
        'google',
        { scope: ['email']},
        () => {
            console.info('google authentification');
        }
    ));

router.get('/google/callback',
    passportDefault.authenticate('google'),
    (req, res) => {
        const accessToken = generateAccessToken(req.user.googleId);
        res.redirect('http://localhost:8080?token='+ accessToken);
    }
);

export default router;