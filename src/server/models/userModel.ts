import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    posts: [String]
});


const userModel = mongoose.models.User ||  mongoose.model("User", userSchema);

export default userModel;