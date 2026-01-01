import { NextResponse } from 'next/server';
import ConnectMongo from '@/libs/mongoConnection';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./store/Providers";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Users from '@/models/userModel';
import AuthStoreInitializer from '@/components/auth/AuthStoreInitializer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Bayley's Restaurent",
  description: "Developed by Vathila Vidusahan",
};

export default async function RootLayout({ children }) {

  const GetExistingUser = async () => {

    const cookieStore = await cookies();
    const token = cookieStore.get('AuthToken')?.value;
  
    if(token) {
      try {
         const secret = new TextEncoder().encode(process.env.SECRET);
         const { payload } = await jwtVerify(token, secret);
  
        await ConnectMongo();
        return await Users.findById(payload.userId).lean()
        .then(async (data) => {

          const userData = await data;
          console.log(userData);
          console.log('authentication sucess');

          const userDetails = {
            userId: await userData._id.toString(),
            userName: await userData.userName,
            userEmail: await userData.email,
          };

          return userDetails;
        })
        .catch((err) => {
          console.log('Error when fetching the user while authenticating', err);
          return null;
          // return NextResponse.json({message: 'Error when fetching the user while authenticating'});
        });
    
      } catch(err) {
       console.log('User Authentication failed', err);
       return null;
      //  return NextResponse.json({message: 'User Authentication failed'});
      }

    } else {
      console.log('No tokens');
      return null;
    }

  };

  const userState = await GetExistingUser();
  console.log(userState, 'userstate');




  return (
    <Providers>

        {/* Existing user authentication */}
        <AuthStoreInitializer user={userState} />

    <html lang="en" className="bg-amber-950">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-amber-950 flex flex-col min-h-screen`}>
      
        <NavBar />
        <main className="flex-1 bg-amber-950">
          {children}
        </main>
        <Footer />
      </body>
    </html>
    </Providers>
  );
}
