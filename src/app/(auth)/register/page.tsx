"use client";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Page = () => {
  const [showPassword, setShowPassword] = useState(true);
  return (
    <div className="flex items-center justify-center m-auto border border-gray-400/60 rounded-sm py-10 px-3 w-100">
      <form className="flex flex-col gap-6 w-full p-2 ">
        {/* LOGO */}
        <div className="flex flex-col gap-4 items-center ">
          <Image src="/logo.png" alt="Logo" width={60} height={60} />
          <span className="font-semibold text-2xl text-blue-800/90">
            MedLab Pro
          </span>
        </div>
        {/* TOP-FORM */}
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold">Welcome</h1>
          <p className="text-xs text-gray-700 font-normal">
            Please enter your informations to create account.
          </p>
        </div>
        {/* MIDDLE-FORM */}

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="name"
              className="text-xs text-gray-800 font-semibold"
            >
              User name
            </label>
            <input
              className="p-1 rounded-md text-sm"
              type="text"
              id="name"
              placeholder="Enter your name"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-xs text-gray-800 font-semibold"
            >
              Email Address
            </label>
            <input
              className="p-1 rounded-md text-sm"
              type="email"
              id="email"
              placeholder="name@examble.com"
            />
          </div>
          <div className="flex flex-col gap-1 relative">
            <label
              className="text-xs text-gray-800 font-semibold"
              htmlFor="pass"
            >
              Password
            </label>
            <input
              className="p-1  rounded-md"
              type={showPassword ? "password" : "text"}
              id="pass"
              placeholder="* * * * * * * * *"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              type="button"
              className=" cursor-pointer absolute top-7 right-2"
            >
              {showPassword ? (
                <EyeOff className="text-red-600" size={18} />
              ) : (
                <Eye className="text-gray-600" size={18} />
              )}
            </button>
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="phone"
              className="text-xs text-gray-800 font-semibold"
            >
              Phone
            </label>
            <input type="tel" name="phone" id="phone" />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="age"
              className="text-xs text-gray-800 font-semibold"
            >
              Age
            </label>
            <input type="number" id="age" />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="role"
              className="text-xs text-gray-800 font-semibold"
            >
              Role
            </label>
            <select name="ginder" id="role">
              <option value="">Admin</option>
              <option value="">Employee</option>
              <option value="">Patient</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="ginder"
              className="text-xs text-gray-800 font-semibold"
            >
              Ginder
            </label>
            <select name="ginder" id="ginder">
              <option value="">Male</option>
              <option value="">female</option>
            </select>
          </div>
        </div>
        {/* BOTTOM-FORM */}
        <div className="flex flex-col items-center gap-1">
          <button
            className="cursor-pointer hover:bg-blue-600 transition bg-blue-700 w-full p-2 rounded-md text-sm text-white"
            type="submit"
          >
            Register
          </button>
          <p className="text-sm font-normal">
            have an Account?
            <Link
              className="text-xs text-blue-700 font-semibold"
              href="/sign-in"
            >
                Log in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Page;
