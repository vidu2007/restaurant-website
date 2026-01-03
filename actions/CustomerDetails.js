"use server"

import ConnectMongo from "@/libs/mongoConnection";
import Orders from "@/models/orderModel";

export async function GetCustomerOrders(userId) {
    try {
        console.log(userId)
        await ConnectMongo();
        const userOrders = await Orders.find({userId}).lean();

        const plainOrder = userOrders.map(item => {
            return {
                ...item,
                _id: item._id.toString(),
                order: JSON.parse(JSON.stringify(item.order)),
                createdAt: item.createdAt.toISOString(),
                updatedAt: item.updatedAt.toISOString(),
            }
        });

        console.dir(plainOrder, {depth: null}, 'plain order');
        console.log(plainOrder.order)
        return {plainOrder, message: 'Orders success'};

    } catch(err) {
        console.log(err);
        return ({message: "Error fetching orders"});
    }
}