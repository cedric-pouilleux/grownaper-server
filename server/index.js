import express from 'express';
import { breederRoutes/*, varietyRoutes, plantRoutes */} from "./routes";

const app = express();

app.use('/breeders', breederRoutes.getAll);
app.use('/breeders', breederRoutes.postAdd);
app.use('/breeders', breederRoutes.delete);

/*

app.use('/varieties', varietyRoutes.getAll);
app.use('/variety', varietyRoutes.postAdd);
app.use('/variety', varietyRoutes.delete);

app.use('/plants', plantRoutes.getAll);
app.use('/plant', plantRoutes.postAdd);
app.use('/plant', plantRoutes.delete);*/

app.listen(process.env.PORT || 3000, function() {
    console.log('server running on port 3000', '');
});