import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from "passport";
import authRoutes from './routes/auth';
import {
    breederRoutes,
    varietyRoutes,
    plantRoutes,
    feederRoutes,
    feederProductRoutes
} from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize({}));

app.use('/plants', passport.authenticate('jwt', {session: false}), plantRoutes);
app.use('/breeders', breederRoutes);
app.use('/varieties', varietyRoutes);
app.use('/feeders', feederRoutes);
app.use('/feeders-products', feederProductRoutes);
app.use('/auth', authRoutes);

app.listen(process.env.PORT || 3000, function() {
    console.log('server running on port 3000', '');
});