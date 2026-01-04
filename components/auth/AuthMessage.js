"use client"

import React from 'react'
import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { getCookie } from 'cookies-next';
import dynamic from 'next/dynamic';
import { DeleteAuthMessage, ReadAuthMessage } from '@/actions/Auth';
// import PopupMessage from '../popupNotifications/PopupMessage';

export default function AuthMessage() {
    const pathName = usePathname();
    const searchParams = useSearchParams();

    const [authMsg, setAuthMsg] = useState('');
    const [popup, setPopup] = useState(true);
    const PopupMessage = dynamic(() => import('../popupNotifications/PopupMessage'));
    
    
    useEffect(() => {

      async function GetMessage() {
        // const authMessage = getCookie('AuthMsg') || null;
        const authMessage = await ReadAuthMessage();
        setPopup(true);
        setAuthMsg(authMessage);
      }

      GetMessage();

    }, [searchParams, pathName]);

    const handleClose = async () => {
      setPopup(false);
      setAuthMsg('');
      await DeleteAuthMessage();
    }

  return (
    // <PopupMessage title={authMsg} CloseFunc={() => setPopup(false)}/>
    <>
    {authMsg && popup ? <PopupMessage title={authMsg} message='' CloseFunc={() => handleClose()}/> : null}
    </>
  )
}
