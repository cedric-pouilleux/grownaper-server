require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient } = require('mongodb');

app.use(cors({credentials: true, origin: true}));
app.options('*', cors());

/**
 * Init route
 */
app.get('/', async (reqgi, res) => {
    const uri = `mongodb+srv://${process.env.MONGO_DATABASE_USERNAME}:${process.env.MONGO_DATABASE_PASSWORD}@${process.env.MONGO_DATABASE_CLUSTER}/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;

    console.log(uri);

    const mongoClient = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const client = await mongoClient.connect();
    const collection = client.db(process.env.MONGO_DATABASE).collection("feeders");
    const all = await collection.find({}).toArray();
    await mongoClient.close();

    if(all){
        res.status(200).json({
            feeders : all
        });
    } else {
        res.status(404);
    }
});

app.listen(process.env.PORT || 3000, function() {
    console.log('server running on port 3000', '');
});