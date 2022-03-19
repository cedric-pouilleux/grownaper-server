import express from 'express';
import "../utils/database";
import {Breeders} from '../models';

import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";

aws.config.update({
    apiVersion: "2006-03-01",
    accessKeyId: process.env.AWS_S3_KEYID,
    secretAccessKey: process.env.AWS_S3_SECRETKEY,
    region: process.env.AWS_S3_BUCKET_REGION
});

const s3 = new aws.S3();

s3.listBuckets(function(err, data) {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Success", data.Buckets);
    }
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: "grownaper",
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname})
        },
        key: (req, file, cb) => {
            cb(null, Date.now().toString() + file.originalname)
        }
    })
})

const app = express();

export default {

    /**
     * Get all breeders
     */
    all : app.get('/', async (req, res) => {
        const result = await Breeders.find({});
        if(result){
            res.status(200).json(result);
        } else {
            res.status(404).end();
        }
    }),

    /**
     * Add new breeder
     */
    add: app.post(
        '/add',
        upload.single('picture'),
        async (req, res) => {
            const { title, link, country } = req.body;
            const picture = req.file.location;
            console.log(req.file);
            Breeders.create({ title, picture, link, country }, async (err, breeder) => {
                if(err){
                    return res.status(422).json({
                        error : err
                    });
                }
                return res.status(201).json({
                    message : title + ' successful added',
                    breeder
                });
            });
        }),

    /**
     * Edit breeder
     */
    edit: app.put('/edit', async (req, res) => {
        const { _id, title, picture, link, country } = req.body;
        try {
            await Breeders.findOneAndUpdate(
                { _id },
                { title, picture, link, country },
                { new: true }
            );
            return res.status(201).json({
                message : _id + ' successful added'
            });
        } catch(err) {
            console.log(err);
            return res.status(422).json({
                error : err
            });
        }
    }),

    /**
     * Remove breeder by id
     */
    delete: app.delete('/delete/:id', async (req, res) => {
        const id = req.params.id;
        Breeders.deleteOne({ '_id': id }, async (err, breeder) => {
            if(err){
                console.log(err);
                return res.status(422).end();
            }
            return res.status(201).json({
                message: id + 'Has beed delete',
                breeder
            });
        });
    })

};