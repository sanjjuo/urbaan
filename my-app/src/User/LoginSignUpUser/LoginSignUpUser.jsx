import React, { useState } from "react"
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import { FaFacebook, FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RiGoogleFill } from "react-icons/ri";
import { GrApple } from "react-icons/gr";

export function LoginSignUpUser() {
    const [loginSignUpUser, setLoginSignUpUser] = useState("login")
    return (
        <>
            <div className='lg:flex lg:justify-center lg:items-center min-h-screen lg:h-screen bg-userBg px-4 py-20 lg:py-0'>
                <Card color="transparent" shadow={false}>
                    <Typography variant="h4" className='text-primary font-custom text-center text-4xl xl:text-3xl lg:text-3xl'>
                        {
                            loginSignUpUser === "login" ? "Login here" : "Create Account"
                        }
                    </Typography>
                    <Typography color="gray" className="mt-8 xl:mt-1 lg:mt-1 font-semibold font-custom text-secondary text-center text-2xl xl:text-xl">
                        {
                            loginSignUpUser === "login" ? "Welcome! Let’s find your perfect style!" : "Sign up to explore our collections!"
                        }
                    </Typography>
                    <form className="mt-12 xl:mt-8 lg:mt-8 mb-2 lg:w-full max-w-screen-lg">
                        <div className="mb-1 flex flex-col gap-6">
                            <Input
                                maxLength={16}
                                placeholder="Phone Number"
                                pattern="^\+\d{1,3}\s\d{1,4}-\d{1,4}-\d{4}$"
                                className=" !border-gray-300 bg-white py-6 placeholder:text-blue-gray-300 font-custom placeholder:font-custom 
                                placeholder:opacity-100 focus:border-gray-300 focus:border-[1px]"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                            />
                            {
                                loginSignUpUser === "login" ? (
                                    <></>
                                ) : (
                                    <>
                                        <Input
                                            size="lg"
                                            placeholder="Enter your name"
                                            className=" !border-gray-300 bg-white placeholder:text-blue-gray-300 font-custom placeholder:font-custom 
                                            placeholder:opacity-100 focus:border-gray-300 focus:border-[1px]"
                                            labelProps={{
                                                className: "before:content-none after:content-none",
                                            }}
                                        />
                                    </>
                                )
                            }
                            <div className='flex items-center border-[1px] rounded-lg pr-3 !border-gray-300 bg-white'>
                                <Input
                                    type="password"
                                    size="lg"
                                    placeholder="Password"
                                    className="border-none placeholder:text-blue-gray-300 font-custom placeholder:font-custom 
                                placeholder:opacity-100 focus:border-gray-300 focus:border-[1px]"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                />
                                <FaRegEye className='text-xl' />
                            </div>

                            <Link><Typography className='font-custom text-sm text-primary font-medium text-right'>Forgot Password ?</Typography></Link>
                        </div>

                        {
                            loginSignUpUser === "login" ? (
                                <>
                                    <Link to='/otp'><Button className="mt-6 bg-primary font-custom text-sm font-normal capitalize" fullWidth>
                                        Sign in
                                    </Button>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Button className="mt-6 bg-primary font-custom text-sm font-normal capitalize" fullWidth>
                                        Continue
                                    </Button>
                                </>
                            )
                        }

                        {
                            loginSignUpUser === "login" ? (
                                <>
                                    <Typography color="gray" className="mt-4 text-center text-secondary text-sm font-normal font-custom">
                                        Don't have an account?{" "}
                                        <Link onClick={() => setLoginSignUpUser("signUp")} className="font-medium text-primary">
                                            Sign Up
                                        </Link>
                                    </Typography>
                                </>
                            ) : (
                                <>
                                    <Typography color="gray" className="mt-4 text-center text-secondary text-sm font-normal font-custom">
                                        Already have an account?{" "}
                                        <Link onClick={() => setLoginSignUpUser("login")} className="font-medium text-primary">
                                            Login
                                        </Link>
                                    </Typography>
                                </>
                            )
                        }

                        <div className='flex flex-col items-center justify-center gap-4 mt-10'>
                            <Typography className='font-custom font-medium text-secondary text-sm'>Or continue with</Typography>
                            <ul className='flex items-center gap-5'>
                                <li className='bg-loginIconBg text-primary hover:bg-primary hover:text-loginIconBg text-xl 
                                w-16 h-8 p-1 rounded-md flex justify-center items-center cursor-pointer'><RiGoogleFill /></li>
                                <li className='bg-loginIconBg text-primary hover:bg-primary hover:text-loginIconBg text-xl 
                                w-16 h-8 p-1 rounded-md flex justify-center items-center cursor-pointer'><FaFacebook /></li>
                                <li className='bg-loginIconBg text-primary hover:bg-primary hover:text-loginIconBg text-xl 
                                w-16 h-8 p-1 rounded-md flex justify-center items-center cursor-pointer'><GrApple /></li>
                            </ul>
                        </div>

                    </form>
                </Card>
            </div>
        </>
    );
}