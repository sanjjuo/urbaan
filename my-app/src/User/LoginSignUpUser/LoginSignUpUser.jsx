import React, { useState, useContext } from "react";
import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import { FaFacebook, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { RiGoogleFill } from "react-icons/ri";
import { GrApple } from "react-icons/gr";
import { AppContext } from "../../StoreContext/StoreContext";
import axios from "axios";

export function LoginSignUpUser() {
    const [loginSignUpUser, setLoginSignUpUser] = useState("login");
    const { BASE_URL } = useContext(AppContext);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();
    const [loginFormData, setLoginFormData] = useState({
        phone: "",
        password: "",
        name: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/user/auth/login`, {
                phone: loginFormData.phone,
                password: loginFormData.password,
            });

            if (response.data.token) {
                localStorage.setItem("userToken", response.data.token);
                navigate("/");
            }
            alert("Login Success")
        } catch (error) {
            console.error("Login Error:", error.response?.data || error.message);
            alert("Login failed. Please check your credentials.");
        }
    };

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/user/auth/register`, {
                phone: loginFormData.phone,
                name: loginFormData.name,
                password: loginFormData.password,
            });

            if (response.data.token) {
                localStorage.setItem("userToken", response.data.token);
                loginSignUpUser("login");
            }
            alert('Account is created, Now login !')
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Sign up failed.";
            alert(errorMessage);
            console.log(errorMessage); // Log the error message for debugging
        }
    };

    return (
        <div className="lg:flex lg:justify-center lg:items-center min-h-screen lg:h-screen bg-userBg px-4 py-20 lg:py-0">
            <Card color="transparent" shadow={false}>
                <Typography
                    variant="h4"
                    className="text-primary font-custom text-center text-4xl xl:text-3xl lg:text-3xl"
                >
                    {loginSignUpUser === "login" ? "Login here" : "Create Account"}
                </Typography>
                <Typography
                    color="gray"
                    className="mt-8 xl:mt-1 lg:mt-1 font-semibold font-custom text-secondary text-center text-2xl xl:text-xl"
                >
                    {loginSignUpUser === "login"
                        ? "Welcome! Let’s find your perfect style!"
                        : "Sign up to explore our collections!"}
                </Typography>
                <form
                    className="mt-12 xl:mt-8 lg:mt-8 mb-2 lg:w-full max-w-screen-lg"
                    onSubmit={
                        loginSignUpUser === "login"
                            ? handleLoginSubmit
                            : handleSignUpSubmit
                    }
                >
                    <div className="mb-1 flex flex-col gap-6">
                        <Input
                            name="phone"
                            maxLength={16}
                            value={loginFormData.phone}
                            onChange={handleInputChange}
                            placeholder="Phone Number"
                            pattern="\d{10,15}"
                            className="!border-gray-300 bg-white py-6 placeholder:text-blue-gray-300 !font-custom placeholder:font-custom placeholder:opacity-100 focus:border-gray-300 focus:border-[1px]"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                        {loginSignUpUser !== "login" && (
                            <Input
                                name="name"
                                size="lg"
                                value={loginFormData.name}
                                onChange={handleInputChange}
                                placeholder="Enter your name"
                                className="!border-gray-300 bg-white placeholder:text-blue-gray-300 !font-custom placeholder:font-custom placeholder:opacity-100 focus:border-gray-300 focus:border-[1px]"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                            />
                        )}
                        <div className="flex items-center border-[1px] rounded-lg pr-3 !border-gray-300 bg-white">
                            <Input
                                type={passwordVisible ? "text" : "password"}
                                value={loginFormData.password}
                                onChange={handleInputChange}
                                name="password"
                                size="lg"
                                placeholder="Password"
                                className="border-none placeholder:text-blue-gray-300 !font-custom placeholder:font-custom placeholder:opacity-100 focus:border-gray-300 focus:border-[1px]"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                            />
                            <div
                                aria-label={passwordVisible ? "Hide password" : "Show password"}
                                onClick={() => setPasswordVisible(!passwordVisible)}
                                className="cursor-pointer"
                            >
                                {passwordVisible ? (
                                    <FaRegEyeSlash className="text-xl" />
                                ) : (
                                    <FaRegEye className="text-xl" />
                                )}
                            </div>
                        </div>
                        <Link>
                            <Typography className="font-custom text-sm text-primary font-medium text-right">
                                Forgot Password?
                            </Typography>
                        </Link>
                    </div>
                    <Button
                        type="submit"
                        className="mt-6 bg-primary font-custom text-sm font-normal capitalize hover:bg-secondary"
                        fullWidth
                    >
                        {loginSignUpUser === "login" ? "Sign in" : "Continue"}
                    </Button>
                    <Typography
                        color="gray"
                        className="mt-4 text-center text-secondary text-sm font-normal font-custom"
                    >
                        {loginSignUpUser === "login" ? (
                            <>
                                Don't have an account?{" "}
                                <Link
                                    onClick={() => setLoginSignUpUser("signUp")}
                                    className="font-medium text-primary"
                                >
                                    Sign Up
                                </Link>
                            </>
                        ) : (
                            <>
                                Already have an account?{" "}
                                <Link
                                    onClick={() => setLoginSignUpUser("login")}
                                    className="font-medium text-primary"
                                >
                                    Login
                                </Link>
                            </>
                        )}
                    </Typography>
                    <div className="flex flex-col items-center justify-center gap-4 mt-10">
                        <Typography className="font-custom font-medium text-secondary text-sm">
                            Or continue with
                        </Typography>
                        <ul className="flex items-center gap-3">
                            <li className="bg-loginIconBg text-primary hover:bg-primary hover:text-loginIconBg text-xl w-12 h-10 p-1 rounded-md flex justify-center items-center cursor-pointer">
                                <RiGoogleFill />
                            </li>
                            <li className="bg-loginIconBg text-primary hover:bg-primary hover:text-loginIconBg text-xl w-12 h-10 p-1 rounded-md flex justify-center items-center cursor-pointer">
                                <FaFacebook />
                            </li>
                            <li className="bg-loginIconBg text-primary hover:bg-primary hover:text-loginIconBg text-xl w-12 h-10 p-1 rounded-md flex justify-center items-center cursor-pointer">
                                <GrApple />
                            </li>
                        </ul>
                    </div>
                </form>
            </Card>
        </div>
    );
}
