import express from "express";
import ViteExpress from "vite-express";
import userRouter from "./routes/userRoutes.js";
import mediaRouter from "./routes/mediaRoutes.js";
import postRouter from "./routes/postRoutes.js";

import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { authMiddleware } from "./middleware/authMiddleware.js";

dotenv.config();

const app = express();


// Middleware
app.use(express.json()); // Middleware to parse JSON
app.use(cookieParser());
app.use(express.static("public"));

// Routes
app.use(userRouter);


app.use(mediaRouter);
app.use(postRouter);

app.get('/logout', (req, res) => {
  res.clearCookie('user'); // Supprime le cookie nommé user
  res.redirect('/');
});

app.get('/', authMiddleware);

ViteExpress.listen(app, 5000, () =>
  console.log("http://localhost:5000 is running"),
);
