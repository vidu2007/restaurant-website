"use client";

import React from 'react';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '@/app/store/authSlice';


export default function AuthStoreInitializer({ user }) {
    const dispatch = useDispatch();
    const initialized = useRef(false);

    if (!initialized.current && user) {
        dispatch(setUser(user));
        initialized.current = true;
    }

    return null;
};