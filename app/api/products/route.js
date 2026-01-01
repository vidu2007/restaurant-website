import { NextResponse } from "next/server";
import { headers } from "next/headers";
import ConnectMongo from "@/libs/mongoConnection";
import Products from "@/models/productsModel";

export async function GET(request) {
    const headersList = await headers();
    const referer = headersList.get('referer');
    console.log("Referer:", referer);

    console.log('Main URL:', request.nextUrl.origin);

    try { 
        await ConnectMongo();
        const productList = await Products.find().lean();
        return NextResponse.json({productList});
    }
    catch(err) {
        console.log(err);
    }
};

export async function POST(request) {
    try {
        const {productName, price, description} = await request.json();
        await ConnectMongo();
        const newProduct = await Products.create({productName, price, description});
        console.log(newProduct);
        return NextResponse.json({newProduct})
    }
    catch(err) {
        console.log(err);
    }
};