import mongoose from "mongoose";
import {breederSchema, plantSchema, varietySchema} from "./schemas";

const Breeders = mongoose.model('Breeder', breederSchema);
const Plant = mongoose.model('Plant', plantSchema);
const Variety = mongoose.model('Variety', varietySchema);

export {
    Breeders,
    Plant,
    Variety,
}