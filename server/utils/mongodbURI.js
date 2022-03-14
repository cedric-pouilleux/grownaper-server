import dotenv from 'dotenv';
dotenv.config();

const { MONGO_DATABASE_USERNAME, MONGO_DATABASE_PASSWORD, MONGO_DATABASE_CLUSTER, MONGO_DATABASE } = process.env;

export default `mongodb+srv://${MONGO_DATABASE_USERNAME}:${MONGO_DATABASE_PASSWORD}@${MONGO_DATABASE_CLUSTER}/${MONGO_DATABASE}?retryWrites=true&w=majority`;