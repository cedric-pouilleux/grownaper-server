import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const {
    MONGO_DATABASE_USERNAME,
    MONGO_DATABASE_PASSWORD,
    MONGO_DATABASE_CLUSTER,
    MONGO_DATABASE
} = process.env;

const uri = `mongodb+srv://${MONGO_DATABASE_USERNAME}:${MONGO_DATABASE_PASSWORD}@${MONGO_DATABASE_CLUSTER}/${MONGO_DATABASE}?retryWrites=true&w=majority`;

mongoose.connect(uri, function(){
    console.log('mongodb connected');
});

export default mongoose;