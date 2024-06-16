import mongoose from "mongoose";


const mediaSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    data: {
        type: Buffer,
        required: true
    },
    contentType : String
});


const mediaModel = mongoose.models.Media || mongoose.model("Media", mediaSchema);

export default mediaModel;


