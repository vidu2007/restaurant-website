import mongoose from "mongoose";
// import dns from 'node:dns/promises';

//DNS resolvers to MongoDB SRV records
//Cloudflare
dns.setServers(['1.1.1.1', '1.0.0.1']);

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