import mongoose from "mongoose";
import "./utils/database";
import {
    breederSchema,
    plantSchema,
    varietySchema
} from "./schemas";

const Breeders = mongoose.model('Breeder', breederSchema, 'breeders');
const Plant = mongoose.model('Plant', plantSchema, 'plants');
const Variety = mongoose.model('Variety', varietySchema, 'varieties');

export {
    Breeders,
    Plant,
    Variety,
}