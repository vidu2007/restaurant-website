import mongoose from "mongoose";
import dns from 'node:dns/promises';

//DNS resolvers to MongoDB SRV records
//Cloudflare
dns.setServers(['1.1.1.1', '1.0.0.1']);

const connectionString = process.env.uri;

let cached = global.mongoose;

if(!cached) {
    cached = global.mongoose = {conn: null, promise: null};
}

export default async function ConnectMongo() {
    if(cached.conn) return cached.conn;

    if(!cached.promise) {
        cached.promise = mongoose.connect(connectionString)
        .then((mongoose) => {
            console.log('DB connected');
            return mongoose;
        })
        .catch((err) => {
            console.log('DB connection error:', err);
            return null;
        });

        cached.conn = await cached.promise;
        return cached.conn;
    }
};