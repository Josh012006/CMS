import mongoose from "mongoose";


const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    mediaID: String,
    mediaType: String,
    likes: Number,
    comments: [String],
    author: String
}, {timestamps: true});


const postModel = mongoose.models.Post ||  mongoose.model("Post", postSchema);

export default postModel;