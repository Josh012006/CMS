import mediaModel from "../models/mediaModel.js";
import { Request, Response } from "express";
import connectDB from "../config/db.js";



export async function getMedia (req: Request, res: Response) {
    try {

        const { mediaID } = req.params;

        await connectDB();

        const media = await mediaModel.findOne({ _id: mediaID }); 

        if(media) {
            res.status(200).send(media.data);
        } else {
            res.status(404).json({ message: "No media found" });
        }
    
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

interface MulterRequest extends Request {
    file: Express.Multer.File; // Ajouter la propriété file de multer
}



export async function addMedia (req: MulterRequest, res: Response) {
    try {

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        await connectDB();

        const { originalname, buffer, mimetype } = req.file;

        const media = new mediaModel({
            filename: originalname,
            data: buffer,
            contentType: mimetype,
        });

        const myMedia = await media.save();

        if(myMedia) {
            res.status(201).json(myMedia);
        } else {
            res.status(500).json({ message: "Failed to add media" });
        }
    
    } catch (error) {
        res.status(500).json({ message: error });
    }
}