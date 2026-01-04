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
    return cookieStore.get('AuthMsg').value;
}

export async function DeleteAuthMessage() {
    const cookieStore = await cookies();
    cookieStore.delete('AuthMsg');
    redirect('/sign-in');
}