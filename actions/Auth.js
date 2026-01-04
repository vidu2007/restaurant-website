"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation";

export async function LogOutUser() {
    const cookieStore = await cookies();
    cookieStore.delete('AuthToken');
    // redirect('/');
    return;
}

export async function ReadAuthMessage() {
    const cookieStore = await cookies();
    // console.log(cookieStore.get('AuthMsg').value, 'from Auth.js')

    try {
        const message = cookieStore.get('AuthMsg').value;
        console.log(message, 'from Auth.js');
        return message;
    } catch(err) {
        // console.log(err);
        return '';
    }
}

export async function DeleteAuthMessage() {
    const cookieStore = await cookies();
    cookieStore.delete('AuthMsg');
    redirect('/sign-in');
}