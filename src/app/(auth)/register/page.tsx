"use client";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

const Page = () => {
  // useStates
  const [showPassword, setShowPassword] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [role, setRole] = useState("");
  const [gender, setGender] = useState("");
  // resetForm function
  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setPhone("");
    setAge("");
    setRole("");
    setGender("");
  };
  // handleSubmit function
const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  if (!name || !email || !password || !phone || !age || !role || !gender) {
    alert("All fields are required");
    return;
  }

  const newUser = {
    name,
    email,
    password,
    phone,
    age,
    role,
    gender,
  };

  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    // اقرأ البيانات مرة واحدة
    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      resetForm();
      router.push("/sign-in");
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  }
};

const router = useRouter();

  return (
    <div className="flex items-center justify-center m-auto border border-gray-400/60 rounded-sm py-10 px-3 w-100">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full p-2 ">
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
              onChange={(e) => setName(e.target.value)}
              value={name}
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
              value={email}
                            onChange={(e) => setEmail(e.target.value)}

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
              value={password}
                            onChange={(e) => setPassword(e.target.value)}

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
            <input type="tel" name="phone" id="phone" value={phone} 
                          onChange={(e) => setPhone(e.target.value)}

            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="age"
              className="text-xs text-gray-800 font-semibold"
            >
              Age
            </label>
            <input type="number" id="age" value={age} 
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="role"
              className="text-xs text-gray-800 font-semibold"
            >
              Role
            </label>
            <select value={role} onChange={(e)=> setRole(e.target.value)} name="ginder" id="role">
              <option value="Admin">Admin</option>
              <option value="Employee">Employee</option>
              <option value="Patient">Patient</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="ginder"
              className="text-xs text-gray-800 font-semibold"
            >
              Ginder
            </label>
            <select value={gender} onChange={(e)=> setGender(e.target.value)} name="ginder" id="ginder">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
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
