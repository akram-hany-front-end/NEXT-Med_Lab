"use client"

import { useEffect, useState } from "react";


type User = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  age: string | number;
  role: string;
  gender: string;
};

const Page = () => {

  const [profile, setProfile] = useState<User | null>(null);

  const fetchUser = async () => {

    const res = await fetch("/api/register")
    const data = await res.json()
    setProfile(data.user)
  }
  useEffect(() => {
    const load = async () => {
      await fetchUser();

    }
    load()
  }, []);

  return (
    <div className="text-center m-auto font-extrabold text-5xl text-blue-700">Welcome Back {profile?.name} </div>
  );
};

export default Page;
