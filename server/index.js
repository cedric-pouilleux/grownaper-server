import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from "passport";
import expressSession from 'express-session';
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

/**
 * Session probably useless here with jwt return url param access token
 */
app.use(expressSession({
    secret: '1234567890',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize({}));
app.use(passport.session({}));

/**
 * TODO Modularize routing
 */
app.use('/breeders', breederRoutes.all);
app.use('/breeder', breederRoutes.add);
app.use('/breeder', breederRoutes.delete);
app.use('/breeder', breederRoutes.edit);

app.use('/varieties', varietyRoutes.getAll);
app.use('/variety', varietyRoutes.postAdd);
app.use('/variety', varietyRoutes.delete);
app.use('/variety', varietyRoutes.edit);

app.use('/plants', plantRoutes.getAll);
app.use('/plant', plantRoutes.add);
app.use('/plant', plantRoutes.delete);
app.use('/plant', plantRoutes.edit);
app.use('/plant', plantRoutes.cut);
app.use('/plant', plantRoutes.addNote);
app.use('/plant', plantRoutes.startFlowering);
app.use('/plant', plantRoutes.startCurring);

app.use('/feeders', feederRoutes.get);
app.use('/feeders', feederRoutes.add);
app.use('/feeders', feederRoutes.edit);
app.use('/feeders', feederRoutes.remove);

app.use('/feeders-products', feederProductRoutes.get);
app.use('/feeders-products', feederProductRoutes.add);
app.use('/feeders-products', feederProductRoutes.edit);
app.use('/feeders-products', feederProductRoutes.remove);

app.use('/auth', authRoutes);

app.listen(process.env.PORT || 3000, function() {
    console.log('server running on port 3000', '');
});