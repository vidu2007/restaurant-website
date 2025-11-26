import mongoose from "mongoose";

const connectionString = process.env.uri;

export default async function ConnectMongo() {

    try {
        await mongoose.connect(connectionString)
        .then(() => console.log('DB connected'));
    }
    catch(err) {
        console.log(err);
    }

};