"use client"

import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { clearUser } from "@/app/store/authSlice";

export default function page() {
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
            try {
                const res = fetch('/api/logout', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    cache: "no-store",
                })
                .then(() => {
                    dispatch(clearUser());
                    router.push('/');
                })

            } catch(err) {
                console.log(err);
            }
    }, []);

    return(
        <>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white mt-10 mb-5">Signing out ...</h1>
            <h3 className="text-2-xl md:text-5xl lg:text-4xl font-bold text-center text-white mt-10 mb-5">Please wait!</h3>
        </>
    )
}