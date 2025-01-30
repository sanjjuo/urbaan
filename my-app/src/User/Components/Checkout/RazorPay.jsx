import React, { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../StoreContext/StoreContext";

const RazorPay = ({ orderDetails }) => {
    const navigate = useNavigate();
    const { BASE_URL } = useContext(AppContext);

    const loadScript = (src) => {
        return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => reject(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        try {
            const { data } = await axios.post(`${BASE_URL}/placeOrder`, orderDetails);
            if (!data.razorpayOrderId) throw new Error("Failed to create Razorpay order");
            
            const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
            if (!res) {
                toast.error("Failed to load Razorpay SDK. Try again.");
                return;
            }
            
            const options = {
                key: "YOUR_RAZORPAY_KEY", // Replace with your Razorpay Key
                amount: data.amount,
                currency: data.currency,
                name: "Your Company Name",
                description: "Order Payment",
                order_id: data.razorpayOrderId,
                handler: async function (response) {
                    try {
                        const verifyRes = await axios.post("https://urbaan.in/api/webhook/razorpay", {
                            event: "payment.captured",
                            payload: {
                                payment: {
                                    entity: {
                                        id: response.razorpay_payment_id,
                                        order_id: response.razorpay_order_id,
                                        status: "captured",
                                        amount: data.amount,
                                        currency: "INR",
                                        method: "razorpay",
                                        captured_at: Date.now()
                                    }
                                }
                            }
                        });
                        
                        if (verifyRes.status === 200) {
                            toast.success("Payment Successful!");
                            navigate("/order-success");
                        } else {
                            throw new Error("Payment verification failed");
                        }
                    } catch (error) {
                        toast.error(error.message);
                    }
                },
                prefill: {
                    name: "User Name",
                    email: "user@example.com",
                    contact: "9999999999"
                },
                theme: {
                    color: "#3399cc"
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong!");
        }
    };

    return (
        <button onClick={handlePayment} className="px-4 py-2 bg-blue-500 text-white rounded-md">
            Pay Now
        </button>
    );
};

export default RazorPay;
