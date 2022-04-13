import passport from 'passport';
import passportJwt from 'passport-jwt';
import dotenv from "dotenv";

dotenv.config();

const jwtOptions = {
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeader(),
    secretOrKey: process.env.AUTH_JWT_SECRET,
    issuer: process.env.AUTH_JWT_ISSUER,
    audience: process.env.AUTH_JWT_AUDIENCE
};

passport.use(
    new passportJwt.Strategy(jwtOptions, (payload, done) => {
        console.log(parseInt(payload.sub));
        return done();
    })
);