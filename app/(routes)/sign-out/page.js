'use client'

import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { clearUser } from "@/app/store/authSlice";

export default function page() {
    // const dispatch = useDispatch();
    // const router = useRouter();

    // useEffect(() => {
    //     dispatch(() => clearUser())
    // }, []);

    return(
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white mt-10 mb-5">Signing out ...</h1>
    )
}