import e, { Request, Response } from "express";
import connectDB from "../config/db.js";
import postModel from "../models/postModel.js";

import dotenv from "dotenv";

dotenv.config();

import axios from "axios";


export async function addPost (req: Request, res: Response) {
    try {
        await connectDB();

        const { title, content, mediaID, mediaType, author } = req.body;

        const post = new postModel({
            title,
            content,
            mediaID,
            mediaType,
            likes: 0,
            comments: [],
            author
        });

        const creationResult = await post.save();

        if(creationResult) {
            res.status(201).json( creationResult );
        } else {
            res.status(500).json({ message: "An error occured while creating new Post" });
        }

    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export async function getAllPosts(req: Request, res: Response) {
    try {
        await connectDB();

        const posts = await postModel.find();

        if (posts) {
            res.status(200).json(posts);
        } else {
            res.status(404).json({ message: "No posts found" });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
}



export async function getPosts (req: Request, res: Response) {
    try {
        const { email } = req.body;

        await connectDB();

        const user = await axios.post(`${process.env.VITE_APP_API_URL}getUser/`, JSON.stringify({ email }), { headers: { 'Content-Type': 'application/json' }, validateStatus: status => status >= 200 });

        if(user.status !== 200) {
            res.status(404).json({ message: "No user found" });
        }

        const postsTab = user.data.posts;

        const posts = await postModel.find({_id:{ $in: postsTab}});

        if(posts) {
            res.status(200).json( posts );
        } else {
            res.status(404).json({ message: "No post found" });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }

}


export async function addLike (req: Request, res: Response) {
    try {
        const { postID } = req.body;

        await connectDB();

        const post = await postModel.findByIdAndUpdate(postID, { $inc: { likes: 1 } }, { new: true });

        if(post) {
            res.status(200).json( post );
        } else {
            res.status(404).json({ message: "No post found" });
        }

    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export async function removeLike (req: Request, res: Response) {  
    try {
        const { postID } = req.body;

        await connectDB();

        const post = await postModel.findByIdAndUpdate(postID, { $inc: { likes: -1 } }, { new: true });

        if(post) {
            res.status(200).json( post );
        } else {
            res.status(404).json({ message: "No post found" });
        }

    } catch (error) {
        res.status(500).json({ message: error });
    }
}


export async function addComment (req: Request, res: Response) {
    try {
        const { postID, comment } = req.body;

        await connectDB();

        const post = await postModel.findByIdAndUpdate(postID, { $push: { comments: comment } }, { new: true });

        if(post) {
            res.status(200).json( post );
        } else {
            res.status(404).json({ message: "No post found" });
        }

    } catch (error) {
        res.status(500).json({ message: error });
    }
}