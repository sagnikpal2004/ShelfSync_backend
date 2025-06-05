import { Request, Response, NextFunction } from "express";
// import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
// import multerS3 from "multer-s3";
import path from "path";

const url = process.env.STORAGE_URI!;

// const s3 = new S3Client({
//     credentials: {
//         accessKeyId: process.env.AWS_ACCESS_KEY!,
//         secretAccessKey: process.env.AWS_SECRET_ACCESS!
//     },
//     region: process.env.AWS_REGION
// });

// const upload = multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: process.env.AWS_BUCKET_NAME!,
//         contentType: multerS3.AUTO_CONTENT_TYPE,
//         metadata: (req, file, cb) => { cb(null, { fieldName: file.fieldname }); },
//         key: (req, file, cb) => { cb(null, `${Date.now().toString()}_${file.originalname}`); }
//     })
// });

const storage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, path.join(__dirname, '../../storage')) },
    filename: (req, file, cb) => { cb(null, `${Date.now().toString()}_${file.originalname}`); }
});
const upload = multer({ storage: storage });

// const uploadImage = (req: Request, res: Response, next: NextFunction) => {
//     if (req.is("multipart/form-data"))
//         return upload.single("image")(req, res, next);
//     next();
// }
// export default uploadImage;

const uploadImage = (req: Request, res: Response, next: NextFunction) => {
    if (req.is("multipart/form-data"))
        return upload.single("image")(req, res, () => {
            if (req.file) (req.file as any).location = `${url}/${req.file.filename}`;
            next();
        });
    next();
}
export default uploadImage;

// https://shelf-sync.s3.us-east-2.amazonaws.com/<filename>