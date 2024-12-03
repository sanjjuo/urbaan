import React from "react";
import { Input, Typography, Button, Card } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function Otp() {
  const inputRefs = React.useRef([]);
  const [otp, setOtp] = React.useState(Array(4).fill(""));

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value.replace(/[^0-9]/g, "");
    setOtp(newOtp);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  function handleBackspace(event, index) {
    if (event.key === "Backspace" && !event.target.value && index > 0) {
      console.log(inputRefs.current[index - 1]);
      inputRefs.current[index - 1].focus();
    }
  }

  return (
    <>
      <div className='lg:flex lg:justify-center lg:items-center min-h-screen lg:h-screen bg-userBg px-4 py-20 lg:py-0'>
        <Card color='transparent' shadow={false} className='flex items-center'>
          <Typography variant="h4" className='text-primary font-custom text-center text-4xl xl:text-3xl lg:text-3xl'>
            Verification
          </Typography>
          <Typography color="gray" className="mt-8 xl:mt-1 lg:mt-1 font-normal font-custom text-secondary text-center 
          text-lg xl:text-lg">
            We have sent a verification code to (+971) 123-4567
          </Typography>
          <div className="w-full max-w-sm mt-10 xl:mt-14 lg:mt-14 flex flex-col">
            <div className="my-4 flex items-center justify-center gap-2">
              {otp.map((digit, index) => (
                <React.Fragment key={index}>
                  <Input
                    type="text"
                    maxLength={1}
                    className="!w-10 appearance-none !border-t-blue-gray-200 text-center !text-lg placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    containerProps={{
                      className: "!min-w-0 !w-10 !shrink-0",
                    }}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleBackspace(e, index)}
                    inputRef={(el) => (inputRefs.current[index] = el)}
                  />
                </React.Fragment>
              ))}
            </div>
            <Typography
              variant="small"
              color="blue-gray"
              className="flex items-center justify-center gap-1 text-center font-medium font-custom"
            >
              Check text messages for your OTP
            </Typography>

            <Typography
              variant="small"
              className="text-center font-normal text-blue-gray-500 font-custom"
            >
              Didn't get the OTP ? <span className="font-light">Resend SMS in 30s</span>
            </Typography>
            <Link to='/'>
              <Button className='mt-8 bg-primary text-sm font-normal capitalize font-custom w-full'>Confirm</Button>
            </Link>
          </div>
        </Card>
      </div>
    </>
  );
}