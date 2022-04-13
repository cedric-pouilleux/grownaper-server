import passport from "passport";
import {Strategy} from 'passport-google-oauth20';
import dotenv from "dotenv";
import { Users } from '../models';

dotenv.config();

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

passport.use(
    'google',
    new Strategy({
        clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
        clientSecret: process.env.GOOGLE_OAUTH_SECRET,
        callbackURL: process.env.GOOGLE_OAUTH_REDIRECT,
        passReqToCallback : true
    },
    async (request, accessToken, refreshToken, profile, done) => {
        try {
            let user = await Users.find({ 'googleId': profile.id });
            if (!user.length) {
                user = await Users.create({
                    googleId: profile.id,
                    createdAt: new Date(),
                    displayName: profile.displayName,
                    emails: profile.emails,
                    photos: profile.photos
                });
            }
            return done(null, user);
        } catch(err) {
            return done(null, null);
        }
    }
));

export default passport;