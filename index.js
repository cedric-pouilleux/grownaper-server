require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient } = require('mongodb');

app.use(cors({credentials: true, origin: true}));
app.options('*', cors());

const { MONGO_DATABASE_USERNAME, MONGO_DATABASE_PASSWORD, MONGO_DATABASE_CLUSTER, MONGO_DATABASE } = process.env;
const uri = `mongodb+srv://${MONGO_DATABASE_USERNAME}:${MONGO_DATABASE_PASSWORD}@${MONGO_DATABASE_CLUSTER}/${MONGO_DATABASE}?retryWrites=true&w=majority`;

/**
 * Breaders CRUD
 */
app.route('/breeders')
    .get(async (req, res) => {
        const mongoClient = new MongoClient(uri);
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