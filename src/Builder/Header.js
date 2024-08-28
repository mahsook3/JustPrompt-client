import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/user.context";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logouticon from '../assets/logout.svg';

export default function Header() {
    const { user } = useContext(UserContext);
    const { logOutUser } = useContext(UserContext);
    const navigate = useNavigate();


    useEffect(() => {
        if (user && user.profile) {
            console.log(user.profile.email);
        }
    }, [user]);

    const logOut = async () => {
        try {
          const loggedOut = await logOutUser();
          if (loggedOut) {
            navigate('/');
            
            toast.success("Logged out successfully!");
          }
        } catch (error) {
          toast.error("An error occurred. Please try again later.");
        }
    };

    return (
<>
    <ToastContainer />
    <div className="flex items-center justify-between p-5">
        <a href="/" className="flex items-center">
            <p className="text-2xl font-bold text-green-400">
                Just
                <span className="text-gray-700">Prompt.ai</span>
            </p>
        </a>
        <a
            variant="contained"
            onClick={logOut}
            className="flex items-center mb-4"
        >
            <img src={logouticon} alt="logout" className="h-6 w-6 mr-2" />
            <span className="text-sm text-gray-700">Logout</span>
        </a>
    </div>
</>

    );
}