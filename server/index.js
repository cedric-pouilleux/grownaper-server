import express from 'express';
import BreederRoutes from "./routes/breeders";
const app = express();

app.use('/breeders', BreederRoutes.getAll);
app.use('/breeders', BreederRoutes.postAdd);
app.use('/breeders', BreederRoutes.delete);

app.listen(process.env.PORT || 4000, function() {
    console.log('server running on port 4000', '');
});