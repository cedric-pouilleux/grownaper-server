import express from "express";
import { breederRoutes, varietyRoutes, plantRoutes } from "./routes";
import cors from "cors";

const bodyParser = require('body-parser')
const app = express();

app.use(cors());

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
app.use('/plant', plantRoutes.postAdd);
app.use('/plant', plantRoutes.delete);
app.use('/plant', plantRoutes.edit);

app.listen(process.env.PORT || 3000, function() {
    console.log('server running on port 3000', '');
});