import express from 'express';
import passportDefault from '../auth/google-passport';
import generateAccessToken from "../auth/token";

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
    passportDefault.authenticate(
        'google',
        { }
    ),
    (req, res) => {
        const accessToken = generateAccessToken(req.user.googleId);
        res.redirect('http://localhost:8080?token='+ accessToken);
    }
);

export default router;