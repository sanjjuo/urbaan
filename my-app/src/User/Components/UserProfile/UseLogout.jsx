import { Button } from '@material-tailwind/react';
import React from 'react';
import { Link } from 'react-router-dom';

const UserLogout = ({ setUserDash }) => {

    const handleCancelClick = () => {
        console.log("Cancel button clicked");
        if (setUserDash) {
            setUserDash('dashboard'); // Ensure setUserDash is available
            console.log("User dashboard reset to:", 'dashboard'); // Log the update
        }
    }
        return (
            <div className="flex flex-col justify-center items-center h-[50vh]">
                <h1 className="text-3xl font-semibold text-gray-800 mb-4">
                    Do you want to logout?
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                    Please confirm if you would like to log out of your account.
                </p>
                <div className="flex justify-center gap-4">
                    {/* Using Link for navigation */}
                    <Link to='/login-user'>
                        <Button
                            className="px-6 py-2 font-custom capitalize text-sm font-normal bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
                        >
                            Yes, Logout
                        </Button>
                    </Link>
                    {/* Handling the Cancel button click */}
                    <Button
                        onClick={handleCancelClick}
                        className="px-6 py-2 font-custom capitalize text-sm font-normal bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-200"
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        );
    };

    export default UserLogout;
