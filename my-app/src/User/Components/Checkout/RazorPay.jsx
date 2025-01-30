import React from 'react';
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../../StoreContext/StoreContext";

const RazorPay = () => {
    const navigate = useNavigate();
    const { BASE_URL } = useContext(AppContext);

    const loadScript = (src) => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => reject(false);
            document.body.appendChild(script);
        });
    };

    // Example usage
    loadScript('https://example.com/script.js')
        .then(() => console.log('Script loaded successfully'))
        .catch(() => console.error('Failed to load script'));

    return (
        <>

        </>
    )
}

export default RazorPay

