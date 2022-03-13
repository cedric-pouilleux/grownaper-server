require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient } = require('mongodb');

const uri = `mongodb+srv://${process.env.MONGO_DATABASE_USERNAME}:${process.env.MONGO_DATABASE_PASSWORD}@${process.env.MONGO_DATABASE_CLUSTER}`;

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors({credentials: true, origin: true}));
app.options('*', cors());

/**
 * Init route
 */
app.get('/', (req, res) => {
    client.connect(async (err) => {
        const collection = client.db(process.env.MONGO_DATABASE).collection("feeders");
        const all = await collection.find({}).toArray();
        await client.close();
        res.status(200).json({
            feeders : all
        });
    });
});

app.listen(process.env.PORT || 3000, function() {
    console.log('server running on port 3000', '');
});