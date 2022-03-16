import mongoose from "mongoose";
import {breederSchema} from "../schemas";

export const Breeders = mongoose.model('Breeders', breederSchema);