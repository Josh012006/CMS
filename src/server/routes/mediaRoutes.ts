import { Router } from "express";
import { addMedia, getMedia } from "../controllers/mediaControllers.js";

import multer from "multer";
import { authMiddleware } from "../middleware/authMiddleware.js";


const mediaRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


mediaRouter.post('/addMedia', authMiddleware, upload.single('media'), addMedia as any);
mediaRouter.get('/getMedia/:mediaID', authMiddleware, getMedia);


export default mediaRouter;