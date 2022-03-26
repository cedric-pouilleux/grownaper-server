import mongoose from "mongoose";
import uniqueValidator from 'mongoose-unique-validator';

import breederSchema from "./breeder";
import plantSchema from "./plant";
import varietySchema from './variety';
import feederSchema from './feeders';
import feederProductSchema from './feedersProducts';

mongoose.plugin(uniqueValidator);

export {
    breederSchema,
    plantSchema,
    varietySchema,
    feederSchema,
    feederProductSchema
}