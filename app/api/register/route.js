import bcrypt from 'bcrypt';
import Users from '@/models/userModel';
import ConnectMongo from '@/libs/mongoConnection';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SignJWT } from 'jose';

export async function POST(request) {

    const cookieStore = await cookies();

    const {email, password, userName} = await request.json();

    await ConnectMongo();

    try {
        if(!email || !password || !userName) {
            console.log('please provide credentials');
            return NextResponse.json({message: 'Please provide credentials'});
        }

        //Email Validation
        if(/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
            console.log('Wrong email format');
            return NextResponse.json({message: 'Please enter a valid email address'});
        }

        const existingUser = await Users.findOne({email: email});

        if(existingUser) {
            console.log('existing user');
            return NextResponse.json({message: 'You have already registered'});

        } else {

            const encryptPassword = await bcrypt.hash(password, 13);
    
            const newUser = await Users.create({email: email, password: encryptPassword, userName: userName})
            console.log('user created');

            const jwtSecret = new TextEncoder().encode(process.env.SECRET);
            const token = await new SignJWT({userId: newUser._id.toString()}).setProtectedHeader({alg: "HS256"}).setExpirationTime('1h').sign(jwtSecret);

            cookieStore.set({
                name: 'AuthToken',
                httpOnly: true,
                maxAge: 3600,
                value: token,
                path: '/',
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
            })

            return NextResponse.json({message: 'Profile registered successfully', userId: newUser._id, userName: newUser.userName, userEmail: newUser.email});
            
        }



    } catch(err) {
        console.log(err);
    }
}