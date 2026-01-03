"use client"

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '@/app/store/authSlice';
import PopupMessage from '@/components/popupNotifications/PopupMessage';

export default function UserSettings() {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    console.log(user, 'from user settings component');

    const [isLoading, setIsLoading] = useState(false);
    const [popup, setPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupTitle, setPopupTitle] = useState('');

    const [userName, setUserName] = useState(user.userName);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleUserUpdate = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if(password === confirmPassword) {
            try {
                const newUser = await fetch('/api/user', {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: user.userId,
                        userName: userName,
                        password: password,
    
                    }),
                });

                const {updatedUser, message} = await newUser.json();

                console.log(updatedUser);

                if(message === 'Update Successful') {
                    dispatch(setUser({userId: updatedUser._id, userName: updatedUser.userName, userEmail: updatedUser.email}));
                    setPopupTitle('Success');
                    setPopupMessage('Profile updated successfully');

                } else {
                    setPopupTitle('Error during update');
                    setPopupMessage('There was an error updating your profile. Please try again.');
                }
                
                setPassword('');
                setConfirmPassword('');
                setPopup(true);
                setIsLoading(false);
    
            } catch(err) {
                console.log(err);
            }

        } else {
            alert('Passwords do not match');
        }
    };

  return (
    <section className='px-5 py-2'>

        {popup ? <PopupMessage title={popupTitle} message={popupMessage} CloseFunc={() => setPopup(false)} /> : null}

        <div>
            <h1 className='text-center text-2xl font-bold'>Settings</h1>
        </div>
        <form onSubmit={(e) => handleUserUpdate(e)}>
            <div className="mb-4">
                <label htmlFor="UserName" className="block text-lg font-medium text-white mb-2">Username</label>

                <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} required placeholder='Lewis Hamilton' maxLength={30} id="UserName" name="userName" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>

            <div className="mb-4">
                <label htmlFor="eMail" className="block text-lg font-medium text-white mb-2">E-mail</label>

                <input type='email' value={user.userEmail} readOnly maxLength={30} id="eMail" name="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-text-white"/>
            </div>

            <div className="mb-4">
                <label htmlFor="password" className="block text-lg font-medium text-white mb-2">Password</label>

                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='password' maxLength={30} id="password" name="password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-text-white"/>
            </div>

            <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-lg font-medium text-white mb-2">Confirm Password</label>

                <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder='confirm password' maxLength={30} id="confirmPassword" name="confirmPassword" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-text-white"/>
            </div>

            <div className="mb-4">
                <button type='submit' className='w-1/4 bg-amber-800 text-white px-4 py-2 rounded-md hover:bg-amber-950 transition-colors duration-300'>{isLoading ? 'Please wait...' : 'Update the profile'}</button>
            </div>
        </form>
    </section>
  )
}
