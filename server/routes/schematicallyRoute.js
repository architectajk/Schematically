import express from "express"
import { addAssest } from "../controllers/schematicallyController.js"
import multer from "multer"

const schematicallyRouter = express.Router();

//Image Storage Engine

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})
const upload = multer({storage:storage})

schematicallyRouter.post("/add",upload.single("image"),addAssest)

export default schematicallyRouter;