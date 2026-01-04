"use client"

import React from 'react'
import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { getCookie } from 'cookies-next';
import dynamic from 'next/dynamic';
import { DeleteAuthMessage, ReadAuthMessage } from '@/actions/Auth';

export default function AuthMessage() {
    const pathName = usePathname();
    const searchParams = useSearchParams();

    const [authMsg, setAuthMsg] = useState('');
    const [popup, setPopup] = useState(true);
    const PopupMessage = dynamic(() => import('../popupNotifications/PopupMessage'));
    
    
    useEffect(() => {

      function GetMessage() {
        // const authMessage = getCookie('AuthMsg') || null;
        const authMessage = ReadAuthMessage();
        setPopup(true);
        setAuthMsg(authMessage);
      }

      GetMessage();

    }, [pathName, searchParams]);

    const handleClose = () => {
        DeleteAuthMessage();
        setAuthMsg('');
        setPopup(false);
    }

  return (
    // <PopupMessage title={authMsg} CloseFunc={() => setPopup(false)}/>
    <>
    {authMsg && popup ? <PopupMessage title={authMsg} message='' CloseFunc={() => handleClose()}/> : null}
    </>
  )
}
