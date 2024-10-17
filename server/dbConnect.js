import mongoose from "mongoose";
async function dbConnect() {
    try {
        await mongoose.connect('mongodb+srv://mujahidahmed:Nanocollege$12@mujahidcluster.zk8lfcv.mongodb.net/formbuilder');
        console.log('Mongo DB connected successfully');
    } catch (error) {
        console.error("connection failed");
    }
}
dbConnect();