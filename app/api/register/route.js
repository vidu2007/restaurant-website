import bcrypt from 'bcrypt';
import Users from '@/models/userModel';
import ConnectMongo from '@/libs/mongoConnection';
import { NextResponse } from 'next/server';

export async function POST(request) {
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
            .then(() => {
                console.log('user created');
                return NextResponse.json({message: "User created successfully"});
            });
        }



    } catch(err) {
        console.log(err);
    }
}