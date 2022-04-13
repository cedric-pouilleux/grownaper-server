import mongoose from "mongoose";
import uniqueValidator from 'mongoose-unique-validator';

mongoose.plugin(uniqueValidator);

import breederSchema from "./breeder";
import plantSchema from "./plant";
import varietySchema from './variety';
import feederSchema from './feeders';
import feederProductSchema from './feedersProducts';
import userSchema from './user';

export {
    breederSchema,
    plantSchema,
    varietySchema,
    feederSchema,
    feederProductSchema,
    userSchema
}