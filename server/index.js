import express from 'express';
import { getAll } from "./routes/breeders";

const app = express();
app.use('/breeders', getAll);

app.listen(process.env.PORT || 4000, function() {
    console.log('server running on port 4000', '');
});