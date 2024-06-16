import connectDB from "../config/db.js";
import userModel from "../models/userModel.js";
import { Request, Response } from 'express';



export async function addUser (req: Request, res: Response) {
    try {
        await connectDB();

        const { username, email, password } = req.body;

        const user = new userModel({
            username,
            email,
            password,
            posts: []
        });

        const creationResult = await user.save();

        if(creationResult) {
            res.status(200).json( creationResult );
        } else {
            res.status(500).json({ message: "An error occured while creating new User" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
}


export async function getUser (req: Request, res: Response) {
    try {
        await connectDB();

        const { email } = req.body;

        const user = await userModel.findOne({ email }); // On cherche un utilisateur avec l'email donné

        if(user) {
            res.status(200).json( user );
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }

}



export async function addUserPost (req: Request, res: Response) {
    try {
        await connectDB();

        const { email, postID } = req.body;

        const user = await userModel.findOneAndUpdate({ email }, {
            $push: {
                posts: postID
            }
        });

        if(user) {
            res.status(200).json( user );
        } else {
            res.status(404).json({ message: "User not found" });
        }  
    }   catch (error) {
        res.status(500).json({ message: error });
    }
}