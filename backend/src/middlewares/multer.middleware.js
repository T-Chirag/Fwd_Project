import path from 'path';
import multer from "multer";

// Set up storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('C:/Users/tchir/Documents/GitHub/Fwd_Project/backend/public/temp'));  // Use absolute path
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);  // Keep original file name
  }
});

const upload = multer({ storage: storage }); 

export { upload };