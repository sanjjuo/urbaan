import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../../StoreContext/StoreContext";

const RazorPay = ({ selectedAddress, paymentMethod, confirmOrder }) => {
    const navigate = useNavigate();
    const { BASE_URL } = useContext(AppContext);

    const handlePlaceOrder = async () => {
        const token = localStorage.getItem("access_token");

        if (!token || !selectedAddress || !paymentMethod) {
            toast.error("Please fill in all the details.");
            return;
        }

        if (!selectedAddress.id) {
            toast.error("Please select a valid address.");
            return;
        }

        const reqBody = {
            address_id: selectedAddress.id,
            payment_option: paymentMethod, // 'COD' or 'Razorpay'
        };

        try {
            if (paymentMethod === "Razorpay") {
                // Step 1: Create Razorpay order via API
                const response = await confirmOrder(reqBody); // API call to create Razorpay order

                // Destructure the fields from the response data
                const { razorpay_order_id, amount, currency, "user name": userName, "mobile number": mobileNumber } =
                    response.data;

                console.log("Razorpay order created successfully:", response);
                console.log("Amount in response (Rupees):", amount);

                // Convert amount to paisa if needed
                const amountInPaisa = parseFloat(amount) * 100; // Convert to paisa
                console.log("Amount converted to Paisa:", amountInPaisa);

                // Step 2: Initialize Razorpay checkout
                const options = {
                    key: "rzp_live_54544356457", // Replace with your Razorpay key
                    amount: amountInPaisa, // Pass the amount in paisa
                    currency: currency,
                    name: "Own Weave",
                    description: "Order Payment",
                    order_id: razorpay_order_id,
                    handler: async function (response) {
                        // Step 3: Verify payment via your backend
                        try {
                            const verificationResponse = await axios.post(
                                `${BASE_URL}/api/cart/verify-payment/${razorpay_order_id}/`,
                                {
                                    razorpay_payment_id: response.razorpay_payment_id,
                                },
                                {
                                    headers: {
                                        Authorization: `Bearer ${token}`,
                                    },
                                }
                            );

                            console.log("Payment verified successfully:", verificationResponse.data);

                            // Step 4: Show success toast and navigate
                            toast.success("Payment successful! Order placed.");
                            navigate("/orderplaced");
                        } catch (error) {
                            console.error("Error verifying payment:", error);
                            toast.error("Payment verification failed. Please contact support.");
                        }
                    },
                    prefill: {
                        name: userName, // Dynamically filled from API response
                        contact: mobileNumber, // Dynamically filled from API response
                    },
                    notes: {
                        address: selectedAddress.address_line,
                    },
                    theme: {
                        color: "#172957",
                    },
                };

                const rzp = new window.Razorpay(options);

                // Step 5: Handle payment failure
                rzp.on("payment.failed", function (response) {
                    console.error("Payment Failed:", response);
                    toast.error("Payment failed. Please try again.");
                });

                rzp.open();
            } else if (paymentMethod === "COD") {
                // Handle Cash on Delivery
                const response = await confirmOrder(reqBody);
                console.log("Order placed successfully:", response);
                toast.success("Order placed successfully!");
                navigate("/orderplaced");
            }
        } catch (error) {
            console.error("Error placing order:", error);
            toast.error("Error placing order. Please try again.");
        }
    };

    return (
        <button onClick={handlePlaceOrder} className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Place Order
        </button>
    );
};

export default RazorPay;
