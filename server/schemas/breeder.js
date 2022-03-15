import mongoose from "mongoose";
const { Schema } = mongoose;
import uniqueValidator from 'mongoose-unique-validator';
import slugify from 'slugify-mongoose';

const breederSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Breed title is required'],
        minLength: [3, 'Breed title is too short'],
    },
    slug: {
        type: String,
        slug: 'title',
        unique: true,
    },
    link: String,
    picture: String,
});

breederSchema.plugin(uniqueValidator);
breederSchema.plugin(slugify);

export default breederSchema;