import express from 'express';
import passportDefault from '../auth/google';

const router = express.Router();

router.get(
    '/',
    passportDefault.authenticate('jwt'),
    (req, res) => {
        res.json({
            user: req.user
        });
});

export default router;