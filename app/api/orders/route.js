import ConnectMongo from "@/libs/mongoConnection";
import Order from "@/models/orderModel";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { userId, order, billingAmount } = await request.json();

        await ConnectMongo();

        console.log('billing amount:', billingAmount)

        const newOrder = await Order.create({
            userId,
            order,
            billingAmount: billingAmount,
            status: 'pending'
        });

        console.log(newOrder);
        return NextResponse.json({message: 'Order placed successfully'});

    } catch(err) {
        console.log(err);
        return NextResponse.json({message: 'Internal server error'});
    }
};