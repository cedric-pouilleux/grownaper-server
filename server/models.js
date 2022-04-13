import mongoose from "mongoose";
import "./utils/database";
import {
    breederSchema,
    plantSchema,
    varietySchema,
    feederProductSchema,
    feederSchema,
    userSchema
} from "./schemas";

const Breeders = mongoose.model('Breeder', breederSchema, 'breeders');
const Feeders = mongoose.model('Feeder', feederSchema, 'feeders');
const FeedersProducts = mongoose.model('FeederProduct', feederProductSchema, 'feedersProducts');
const Plant = mongoose.model('Plant', plantSchema, 'plants');
const Variety = mongoose.model('Variety', varietySchema, 'varieties');
const Users = mongoose.model('User', userSchema, 'users');

export {
    Breeders,
    Plant,
    Variety,
    Feeders,
    FeedersProducts,
    Users
}