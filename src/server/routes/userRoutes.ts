import { Router } from "express";
import { addUser, addUserPost, getUser } from "../controllers/userControllers.js";

const userRouter = Router();

userRouter.post('/addUser', addUser);
userRouter.post('/getUser', getUser);
userRouter.post('/addUserPost', addUserPost);





export default userRouter;