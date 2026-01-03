import ConnectMongo from '@/libs/mongoConnection';
import Users from '@/models/userModel';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

async function GetUserData(request) {
    const secret = new TextEncoder().encode(process.env.SECRET);
    // const token = request.cookies.get('AuthToken')?.value || "";
    const cookieStore = await cookies();
    const token = cookieStore.get('AuthToken')?.value || "";

    try {
        const { payload } = await jwtVerify(token, secret);
        console.log(payload);
        return payload.userId;

    } catch(err) {
        console.log(err);
        return NextResponse.json({message: 'Internal server error. Error when GettingUserData'});
    }
};

export async function GET(request) {
    const userId = await GetUserData(request);
     try {
        await ConnectMongo();

        const user = await Users.findById(userId)
        .then(async (data) => {
            const userData = await data;
            console.log('userData', userData);
            return NextResponse.json({userName: user.userName, userId: user._id.tString()});
        })
        .catch((err) => {
            console.log(err);
            return NextResponse.json({message: 'Error getting user from the DB'});
        });

     } catch(err) {
        console.log(err);
        return NextResponse.json({message: 'Internal server error. Error when GET user'});
     }
};

export async function PUT(request) {
    const {id, userName, password} = await request.json();

    if(!id || !userName) {
        console.log('please provide credentials');
        return NextResponse.json({message: 'Please provide credentials'});
    }

    try {

        await ConnectMongo();

        if(!password) {
            const updatedUser = await Users.findByIdAndUpdate(id, {userName: userName}, {new: true});
            console.log('updatedUser', updatedUser);
            return NextResponse.json({updatedUser, message: 'Update Successful'});

        } else {
            const encryptPassword = await bcrypt.hash(password, 13);
            const updatedUser = await Users.findByIdAndUpdate(id, {userName: userName, password: encryptPassword}, {new: true});
            console.log('updatedUser', updatedUser);
            return NextResponse.json({updatedUser, message: 'Update Successful'});
        }

    } catch(err) {
        console.log(err);
        return NextResponse.json({message: 'Internal server error. Error when connecting to DB'});
    }

}