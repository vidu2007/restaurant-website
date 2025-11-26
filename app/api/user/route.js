import { NextResponse } from "next/server";
import ConnectMongo from "@/libs/mongoConnection";
import Users from "@/models/userModel";

export async function GET() {
    try {
        await ConnectMongo();
        const data = await Users.find();
        console.log(data);
        return NextResponse.json({data});
    }
    catch(err) {
        console.log(err);
    }
}

export async function POST(request) {
    try {
        const {userName, email, password} = await request.json();
        await ConnectMongo();
        const newUser = await Users.create({userName, email, password});
        console.log(newUser);
        return NextResponse.json({newUser});
    }
    catch(err) {
        console.log(err);
    }
}