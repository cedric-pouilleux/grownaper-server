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

const Upload = multer({

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

});

export {
    Upload
}