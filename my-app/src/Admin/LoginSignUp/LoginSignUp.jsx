import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import axios from "axios";

const LoginSignUp = () => {
    const [loginSignUp, setLoginSignUp] = useState("login");
    const [formData, setFormData] = useState({ email: "", username: "", password: "" });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const BASE_URL = import.meta.env.VITE_BASE_URL;
            console.log("BASE_URL:", BASE_URL);

            if (loginSignUp === "login") {
                const response = await axios.post(`${BASE_URL}/admin/auth/login`, {
                    email: formData.email,
                    password: formData.password,
                });

                const { token } = response.data; // Extract token
                localStorage.setItem("authToken", token); // Save token in localStorage
                navigate("/adminHome");
            } else {
                const response = await axios.post(`${BASE_URL}/admin/register`, {
                    email: formData.email,
                    username: formData.username,
                    password: formData.password,
                });

                alert(response.data.message || "Account created successfully. Please log in.");
                setLoginSignUp("login");
            }
        } catch (error) {
            setError(error.response?.data?.message || "An error occurred. Please try again.");
        }
    };



    return (
        <div className="relative h-screen w-full bg-cover bg-center bg-[url('/banner.jpeg')] bg-no-repeat">
            <div className="absolute inset-0 bg-primary/60 bg-opacity-50"></div>
            <div className="flex justify-center items-center h-full">
                <Card className="bg-white shadow-md p-10 cursor-default">
                    <div className="flex justify-center items-center mb-10">
                        <div className="pt-2 w-28 rounded-3xl">
                            <img src="/logo.png" alt="Logo" className="w-full object-contain" />
                        </div>
                    </div>
                    <Typography variant="h4" className="font-custom text-secondary text-center text-xl">
                        {loginSignUp === "login" ? "Login to Account" : "Create an Account"}
                    </Typography>
                    {error && <Typography color="red" className="text-center mt-2">{error}</Typography>}
                    <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
                        <div className="mb-1 flex flex-col gap-6">
                            <Typography variant="h6" className="-mb-3 font-custom text-sm font-medium">
                                Email address
                            </Typography>
                            <Input
                                size="lg"
                                placeholder="name@mail.com"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="border-[1px] border-gray-400 focus:border-[1px] focus:!border-gray-400"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                            />

                            {loginSignUp === "signUp" && (
                                <>
                                    <Typography variant="h6" className="-mb-3 font-custom text-sm font-medium">
                                        Username
                                    </Typography>
                                    <Input
                                        size="lg"
                                        placeholder="Your username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        required
                                        className=" border-[1px] border-gray-400 focus:border-[1px] focus:!border-gray-400"
                                        labelProps={{
                                            className: "before:content-none after:content-none",
                                        }}
                                    />
                                </>
                            )}

                            <div className="flex items-center justify-between">
                                <Typography variant="h6" className="-mb-3 font-custom text-sm font-medium">
                                    Password
                                </Typography>
                                {loginSignUp === "login" && (
                                    <Typography
                                        variant="h6"
                                        className="-mb-3 font-custom text-sm font-medium cursor-pointer hover:text-buttonBg"
                                    >
                                        Forget Password ?
                                    </Typography>
                                )}
                            </div>
                            <Input
                                type="password"
                                size="lg"
                                placeholder="********"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                                className=" border-[1px] border-gray-400 focus:border-[1px] focus:!border-gray-400"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                            />
                        </div>

                        {loginSignUp === "signUp" && (
                            <Checkbox
                                label={
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className="flex items-center font-normal font-custom text-sm"
                                    >
                                        I agree to the{" "}
                                        <a href="#" className="font-medium transition-colors hover:text-gray-900">
                                            Terms and Conditions
                                        </a>
                                    </Typography>
                                }
                                color="pink"
                                className="border-2 border-primary w-4 h-4"
                                containerProps={{ className: "-ml-2.5" }}
                            />
                        )}

                        <Button
                            type="submit"
                            className="mt-6 font-custom bg-primary text-sm font-normal capitalize tracking-wider"
                            fullWidth
                        >
                            {loginSignUp === "login" ? "Sign In" : "Sign Up"}
                        </Button>
                        <Typography color="gray" className="mt-4 text-center text-sm font-normal font-custom">
                            {loginSignUp === "login"
                                ? "Don't have an account? "
                                : "Already have an account? "}
                            <Link
                                onClick={() => setLoginSignUp(loginSignUp === "login" ? "signUp" : "login")}
                                className="font-medium text-buttonBg underline"
                            >
                                {loginSignUp === "login" ? "Create Account" : "Sign In"}
                            </Link>
                        </Typography>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default LoginSignUp;
