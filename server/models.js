import mongoose from "mongoose";
import {breederSchema, plantSchema, varietySchema} from "./schemas";

export default {
    Breeders: mongoose.model('Breeder', breederSchema),
    Plant: mongoose.model('Plant', plantSchema),
    Variety: mongoose.model('Variety', varietySchema),
}