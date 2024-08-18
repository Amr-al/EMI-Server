import { Request } from 'express';
import multer from 'multer';
const storage = multer.diskStorage({
  destination: function (req: Request, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    const toCheck = ['jpg', 'png', 'jpeg'];
    if (!toCheck.includes(extension)) {
      cb(new Error("Not a valid Image"), '../frontend/public/uploads');
    }
    cb(null, '../frontend/public/uploads');
  },
  filename: function (req: Request, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, Date.now() + '.' + extension)
  }
})

const upload = multer({ storage: storage })

export default upload;