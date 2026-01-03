import Users from '@/models/userModel';
import ConnectMongo from '@/libs/mongoConnection';
import bcrypt from 'bcrypt';
import { SignJWT } from 'jose';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const secret = process.env.SECRET;

export async function POST(request) {
    const {email, password} = await request.json();

    try {
        if(!email || !password) {
            console.log('No credentials');
            return NextResponse.json({message: 'Please provide credentials'});
        }

        await ConnectMongo();
        const user  = await Users.findOne({email: email}).select('+password');

        if(!user) {
            console.log('Invalid credentials');
            return NextResponse.json({message: 'Invalid credentials'});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) {
            console.log('Invalid credentials');
            return NextResponse.json({message: 'Invalid credentials'});
        }

        const jwtSecret = new TextEncoder().encode(secret);
        const token = await new SignJWT({userId: user._id.toString()}).setProtectedHeader({alg: "HS256"}).setExpirationTime('1h').sign(jwtSecret);

        const cookieStore = await cookies();
        cookieStore.set({
            name: 'AuthToken',
            value: token,
            path: '/',
            httpOnly: true,
            maxAge: 3600,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        });

        return NextResponse.json({userName: user.userName, userId: user._id.toString(), userEmail: user.email, message: 'Login successful'});

    } catch(err) {
        console.log(err);
        return NextResponse.json({message: 'Internal server error'});
    }

};