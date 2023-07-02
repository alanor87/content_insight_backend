import path from 'path';
import multer from 'multer';

const imgStorePath = path.join(process.cwd(), "uploads");

const storage = multer.memoryStorage()

// const multerStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, imgStorePath)
//     },
//     filename: (req, file, cb) => {
//         const fileName = Date.now() + '_' + file.originalname;
//         cb(null, fileName)
//     },
// })
const filesUploadHandler = multer({storage});
export default filesUploadHandler;
