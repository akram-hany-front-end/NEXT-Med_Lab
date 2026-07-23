"use client"
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


const Page = () => {
    const [showPassword, setShowPassword] = useState(true);
  return (
    <div className="flex items-center justify-center m-auto border border-gray-400/60 rounded-sm py-10 px-3 w-fit">
      <form className="flex flex-col gap-6">
        {/* LOGO */}
        <div className="flex flex-col gap-4 items-center ">
          <Image src="/logo.png" alt="Logo" width={60} height={60} />
          <span className="font-semibold text-2xl text-blue-800/90">
            MedLab Pro
          </span>
        </div>
        {/* TOP-FORM */}
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold">Welcome Back</h1>
          <p className="text-xs text-gray-700 font-normal">
            Please enter your credentials to access your medical records.
          </p>
        </div>
        {/* MIDDLE-FORM */}

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-xs text-gray-800 font-semibold"
            >
              Email Address
            </label>
            <input className="p-1 rounded-md text-sm" type="email" id="email" placeholder="name@examble.com" />
          </div>
          <div className="flex flex-col gap-1 relative">
            <Link className="self-end text-xs text-blue-700 " href="/">Forgot Password?</Link>
            <label  className="text-xs text-gray-800 font-semibold" htmlFor="pass">Password</label>
            <input className="p-1  rounded-md" type={showPassword ? "password" : "text" }id="pass" placeholder="* * * * * * * * *" />
            <button
            onClick={ ()=> setShowPassword(!showPassword) }
            type="button" className=" cursor-pointer absolute top-11 right-5">
            {showPassword ? <EyeOff className="text-red-600" size={18} /> : <Eye className="text-gray-600" size={18} />}
          </button>
          </div>
        </div>
        {/* BOTTOM-FORM */}
        <div className="flex flex-col items-center gap-1">
          <button className="cursor-pointer hover:bg-blue-600 transition bg-blue-700 w-full p-2 rounded-md text-sm text-white"  type="submit">SIGN IN</button>
          <p className="text-sm font-normal" >
            Don't have an Account? <Link className="text-xs text-blue-700 font-semibold" href="/register">Register</Link>
          </p>
          
        </div>
      </form>
    </div>
  );
};

export default Page;
