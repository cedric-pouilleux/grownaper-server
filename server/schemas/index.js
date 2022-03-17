import mongoose from "mongoose";
import breederSchema from "./breeder";
import plantSchema from "./plant";
import varietySchema from './variety';

import uniqueValidator from 'mongoose-unique-validator';
import slugify from 'slugify-mongoose';

mongoose.plugin(uniqueValidator);
mongoose.plugin(slugify);

export {
    breederSchema,
    plantSchema,
    varietySchema
}