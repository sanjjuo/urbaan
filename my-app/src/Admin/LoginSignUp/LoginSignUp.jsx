import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";

const LoginSignUp = () => {
    const [loginSignUp, setLoginSignUp] = useState("login")
    return (
        <>
            <div className='relative h-screen w-full bg-cover bg-center bg-[url("/mainbg.jpg")] bg-no-repeat'>
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className='flex justify-center items-center h-full'>
                    <Card className='bg-white shadow-md p-10 cursor-default'>
                        <div className='flex justify-center items-center mb-10'>
                            <div className="pt-2 w-28 rounded-3xl">
                                <img src="/logo.png" alt="" className='w-full object-contain' />
                            </div>
                        </div>
                        <Typography variant="h4" className='font-custom text-secondary text-center text-xl' >
                            {loginSignUp === "login" ? "Login to Account" : "Create an Account"}
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal font-custom text-sm text-center">
                            {loginSignUp === "login" ? "Please enter your email and password to continue." : "Create an account to continue."}
                        </Typography>
                        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                            <div className="mb-1 flex flex-col gap-6">

                                < Typography variant="h6" className="-mb-3 font-custom text-sm font-medium">
                                    Email address
                                </Typography>
                                <Input
                                    size="lg"
                                    placeholder="name@mail.com"
                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                />

                                {
                                    loginSignUp === "login" ? (
                                        <></>
                                    ) : (
                                        <>
                                            <Typography variant="h6" className="-mb-3 font-custom text-sm font-medium">
                                                Username
                                            </Typography>
                                            <Input
                                                size="lg"
                                                placeholder="name@mail.com"
                                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                                labelProps={{
                                                    className: "before:content-none after:content-none",
                                                }}
                                            />
                                        </>
                                    )
                                }

                                <div className='flex items-center justify-between'>
                                    <Typography variant="h6" className="-mb-3 font-custom text-sm font-medium">
                                        Password
                                    </Typography>
                                    <Typography variant="h6" className="-mb-3 font-custom text-sm font-medium cursor-pointer hover:text-buttonBg">
                                        Forget Password ?
                                    </Typography>
                                </div>

                                <Input
                                    type="password"
                                    size="lg"
                                    placeholder="********"
                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                />
                            </div>

                            {loginSignUp === "login" ? (
                                <>
                                    <Checkbox
                                        label={
                                            <Typography
                                                variant="small"
                                                color="gray"
                                                className="flex items-center font-normal font-custom text-sm"
                                            >
                                                Remember Password
                                            </Typography>
                                        }
                                        color='pink'
                                        className='border-2 border-primary w-4 h-4'
                                        containerProps={{ className: "-ml-2.5" }}
                                    />
                                </>
                            ) : (
                                <>
                                    <Checkbox
                                        label={
                                            <Typography
                                                variant="small"
                                                color="gray"
                                                className="flex items-center font-normal font-custom text-sm"
                                            >
                                                I agree the
                                                <a
                                                    href="#"
                                                    className="font-medium transition-colors hover:text-gray-900"
                                                >
                                                    &nbsp;Terms and Conditions
                                                </a>
                                            </Typography>
                                        }
                                        color='pink'
                                        className='border-2 border-primary w-4 h-4'
                                        containerProps={{ className: "-ml-2.5" }}
                                    />
                                </>
                            )}

                            {loginSignUp === "login" ? (
                                <>
                                    <Link to='/adminHome'><Button className="mt-6 font-custom bg-primary text-sm font-normal capitalize tracking-wider"
                                        fullWidth>
                                        Sign In
                                    </Button></Link>
                                </>
                            ) : (
                                <>
                                    <Button className="mt-6 font-custom bg-primary capitalize text-sm font-normal tracking-wider"
                                        fullWidth>
                                        Sign Up
                                    </Button>
                                </>
                            )}

                            {
                                loginSignUp === "login" ? (
                                    <>
                                        <Typography color="gray" className="mt-4 text-center text-sm font-normal font-custom">
                                            Don't have an account?{" "}
                                            <Link onClick={() => setLoginSignUp("signUp")} className="font-medium text-buttonBg underline">
                                                Create Account
                                            </Link>
                                        </Typography>
                                    </>
                                ) : (
                                    <>
                                        <Typography color="gray" className="mt-4 text-center text-sm font-normal font-custom">
                                            Already have an account?{" "}
                                            <Link onClick={() => setLoginSignUp("login")} className="font-medium text-buttonBg underline">
                                                Sign In
                                            </Link>
                                        </Typography>
                                    </>
                                )
                            }

                        </form>
                    </Card >
                </div >
            </div >
        </>
    )
}

export default LoginSignUp