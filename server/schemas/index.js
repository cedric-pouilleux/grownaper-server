import mongoose from "mongoose";

import breederSchema from "./breeder";
import plantSchema from "./plant";
import varietySchema from './variety';

import uniqueValidator from 'mongoose-unique-validator';

mongoose.plugin(uniqueValidator);

export {
    breederSchema,
    plantSchema,
    varietySchema
}