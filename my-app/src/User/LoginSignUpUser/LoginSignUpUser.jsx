import React, { useState, useContext } from "react";
import {
    Card,
    Input,
    Button,
    Typography,
    Checkbox,
} from "@material-tailwind/react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { RiGoogleFill } from "react-icons/ri";
import { AppContext } from "../../StoreContext/StoreContext";
import axios from "axios";
import toast from "react-hot-toast";

export function LoginSignUpUser() {
    const [loginSignUpUser, setLoginSignUpUser] = useState("login");
    const { BASE_URL } = useContext(AppContext);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();
    const [loginFormData, setLoginFormData] = useState({
        phone: "",
        password: "",
        name: "",
        email: "", // Added email field
    });
    const [isWalkIn, setIsWalkIn] = useState(false); // Added state for isWalkIn

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleCheckboxChange = () => {
        setIsWalkIn((prevState) => !prevState); // Toggle isWalkIn value
    };

    const handleAuthSubmit = async (e) => {
        e.preventDefault();
        try {
            const isLogin = loginSignUpUser === "login";
            const endpoint = isLogin ? "/user/auth/login" : "/user/auth/register";
            const payload = isLogin
                ? {
                    phone: loginFormData.phone,
                    password: loginFormData.password,
                }
                : {
                    phone: loginFormData.phone,
                    password: loginFormData.password,
                    name: loginFormData.name,
                    email: loginFormData.email, // Include email
                    isWalkIn: isWalkIn, // Send isWalkIn in the payload
                };
            const response = await axios.post(`${BASE_URL}${endpoint}`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(payload);

            // Handle login response
            if (isLogin && response.data.token) {
                localStorage.setItem("userToken", response.data.token);
                localStorage.setItem('userId', response.data.userId);
                navigate("/");
                toast.success("Login Success");
            }

            //handle coupon
            if (loginSignUpUser === "signUp" && response.data.coupon) {
                localStorage.setItem("userCoupon", response.data.coupon);
            }

            // Handle sign-up response
            if (!isLogin) {
                navigate('/otp', { state: { phone: loginFormData.phone } });
                toast.success("Please verify OTP via the OTP call.");
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message ||
                (isLogin
                    ? "Login failed. Please check your credentials."
                    : "Sign up failed. Please try again.");
            console.error("Error:", errorMessage);
            toast.error(errorMessage);
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
                    onSubmit={handleAuthSubmit}
                >
                    <div className="mb-1 flex flex-col gap-6">
                        <Input
                            name="phone"
                            type='number'
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
                            <>
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
                                <Input
                                    name="email"
                                    type="email"
                                    value={loginFormData.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter your email"
                                    className="!border-gray-300 bg-white placeholder:text-blue-gray-300 !font-custom placeholder:font-custom placeholder:opacity-100 focus:border-gray-300 focus:border-[1px]"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                />
                            </>
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
                                    <FaRegEye className="text-xl" />
                                ) : (
                                    <FaRegEyeSlash className="text-xl" />
                                )}
                            </div>
                        </div>
                        {loginSignUpUser !== "signUp" && (
                            <Link to='/forget-password'>
                                <Typography className="font-custom text-sm text-primary font-medium text-right">
                                    Forgot Password?
                                </Typography>
                            </Link>
                        )}
                    </div>
                    {loginSignUpUser !== "login" && (
                        <div className="flex items-center">
                            <Checkbox
                                color='pink'
                                checked={isWalkIn}
                                onChange={handleCheckboxChange}
                                className="h-4 w-4 rounded-sm"
                            />
                            <Typography className="font-custom text-sm text-secondary">
                                Are you a walk-in customer?
                            </Typography>
                        </div>
                    )}
                    {loginSignUpUser !== "login" && (
                        <div className="flex items-center">
                            <Checkbox
                                color='pink'
                                // checked={isWalkIn}
                                // onChange={handleCheckboxChange}
                                className="h-4 w-4 rounded-sm"
                            />
                            <Typography className="font-custom text-sm text-secondary">
                                I accept the <Link to='/terms-conditions' className='underline text-buttonBg'>Terms and
                                    conditions</Link> and <Link to='/privacy-policy' className='underline text-buttonBg'>Privacy policy</Link>
                            </Typography>
                        </div>
                    )}
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
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setLoginSignUpUser("signUp");
                                    }}
                                    className="font-medium text-primary"
                                >
                                    Sign Up
                                </Link>
                            </>
                        ) : (
                            <>
                                Already have an account?{" "}
                                <Link
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setLoginSignUpUser("login");
                                    }}
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
                        <Link
                            to={`${BASE_URL}/user/auth/google`}
                            className="bg-loginIconBg text-primary hover:bg-gray-300 text-xl w-12 h-10 p-1 rounded-md flex justify-center items-center cursor-pointer">
                            <RiGoogleFill />
                        </Link>
                    </div>
                </form>
            </Card>
        </div>
    );
}
