import { NextResponse } from "next/server";
import { cookies } from 'next/headers';
import { jwtVerify } from "jose";
import ConnectMongo from "@/libs/mongoConnection";
import Reservations from "@/models/reservationModel";

export async function POST(request) {
    try {
        await ConnectMongo();

        const {data} = await request.json();
        const {userId, title, reservationName, contactNumber, date, time, guests, notes} = data;

        console.log('from server', userId, title, reservationName, contactNumber, date, time, guests, notes);
        const newReservation = await Reservations.create({userId, title, reservationName, contactNumber, date, time, guests, notes, status: false});

        console.log(newReservation);
        return NextResponse.json({message: "Your request was received. We'll inform you once it's confirmed. Thank you!", title: "Reservation Request Received"});
    }
    catch(err) {
        console.log(err);
        return NextResponse.json({message: "There was an error processing your reservation. Please try again later.", title: "Reservation Error"});
    }
}

export async function GET(request) {
    try {
        const cookieStore = await cookies();
        console.log('Fetching reservations');
        const token = cookieStore.get('AuthToken')?.value;
        const secret = new TextEncoder().encode(process.env.SECRET);
        const {payload} = await jwtVerify(token, secret);

        console.log('Payload from token:', payload);
    
        await ConnectMongo();
        const reservations = await Reservations.find({userId: payload.userId, status: !'canceled'}).lean();
        return NextResponse.json({reservations, message: "Reservations fetched successfully"});

    } catch(err) {
        console.log(err);
        return NextResponse.json({message: "Error fetching reservations"});
    }
}

export async function DELETE(request) {
    try {
        const {reservationId} = await request.json();
        await ConnectMongo();
        console.log('reservation cancel');
        const canceledReservation = await Reservations.findByIdAndUpdate(reservationId, {status: 'canceled'}, {new: true});

        console.log('Canceled reservation:', canceledReservation);
        return NextResponse.json({message: "Reservation canceled successfully", canceledReservation});
    } catch(err) {
        console.log(err);
        return NextResponse.json({message: "Intertnal server error while canceling reservation"});
    }
};
