import mongoose from "mongoose";
import {breederSchema} from "../schemas/breeder";

export const Breeders = mongoose.model('Breeders', breederSchema);