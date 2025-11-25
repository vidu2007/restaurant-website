import mongoose from "mongoose";

const connectionString = process.env.db_link;

export default async function ConnectMongo() {
    await mongoose.connect(connectionString)
    .then(() => console.log('Database Connected'))
    .catch((err) => console.log(err));
}