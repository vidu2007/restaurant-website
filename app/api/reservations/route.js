import { NextResponse } from "next/server";
import ConnectMongo from "@/libs/mongoConnection";
import Reservations from "@/models/reservationModel";

export async function POST(request) {
    try {
        await ConnectMongo();

        const {data} = await request.json();
        const {title, reservationName, contactNumber, date, time, guests, notes} = data;

        console.log('from server', title, reservationName, contactNumber, date, time, guests, notes);
        const newReservation = await Reservations.create({title, reservationName, contactNumber, date, time, guests, notes});

        console.log(newReservation);
        return NextResponse.json({message: "Your request was received. We'll inform you once it's confirmed. Thank you!", title: "Reservation Request Received"});
    }
    catch(err) {
        console.log(err);
    }
}