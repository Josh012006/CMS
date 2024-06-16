import { Router } from "express";
import { addComment, addLike, addPost, getPosts, getAllPosts, removeLike } from "../controllers/postControllers.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const postRouter = Router();

postRouter.post('/addPost', authMiddleware, addPost);
postRouter.post('/getPosts', authMiddleware, getPosts);
postRouter.get('/getAllPosts', authMiddleware, getAllPosts);
postRouter.patch('/addLike', authMiddleware, addLike);
postRouter.patch('/removeLike', authMiddleware, removeLike);
postRouter.post('/addComment', authMiddleware, addComment);




export default postRouter;