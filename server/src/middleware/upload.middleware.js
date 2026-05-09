import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: function( req,file,cb){
        let uploadPath = "uploads/";
        if (file.fieldname === "resume") {
            uploadPath += "resumes/";
        } else if (file.fieldname === "profilePic") {
            uploadPath += "profiles/";
        }
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: function(req,file,cb){
        cb(null,Date.now()+ "-" + file.fieldname +path.extname(file.originalname));
    }
})

const upload = multer({storage});

export default upload;