import passport from 'passport';
import passportJwt from 'passport-jwt';
import dotenv from "dotenv";
import {Users} from "../models";

dotenv.config();

const jwtOptions = {
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.AUTH_JWT_SECRET,
    issuer: process.env.AUTH_JWT_ISSUER,
    audience: process.env.AUTH_JWT_AUDIENCE
};

passport.use(
    new passportJwt.Strategy(jwtOptions, async (payload, done) => {
        const user = await Users.findOne({ 'googleId' : payload.sub});
        return done(null, user);
    })
);