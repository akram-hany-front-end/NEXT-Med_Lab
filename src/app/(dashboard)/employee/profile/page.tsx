"use client";
import { Settings, XCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
type Profile = {
  name: string;
  img: string;
  age: string;
};
const Page = () => {
  const [mode, setMode] = useState(false);
  const [profile, setProfile] = useState({
    name: "Akram Hany",
    age: "23",
    img: "/man2.png",
  });
  const [name, setName] = useState(profile.name);
  const [age, setAge] = useState(profile.age);
  const [img, setImg] = useState(profile.img);

  // handle Edit function

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !age || !img) {
      alert("Please Fill All Fields");
      return;
    }
    setProfile({
      name,
      age,
      img,
    });
    setMode(false)
  };
  // handle upload function .
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setImg(imageUrl);
  };

 return (
  <div className=" flex items-center justify-center bg-gray-100 p-6">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Profile</h1>

        {mode ? (
          <button
            onClick={() => setMode(false)}
            className="text-red-500 hover:text-red-600 transition"
          >
            <XCircle size={28} />
          </button>
        ) : (
          <button
            onClick={() => setMode(true)}
            className="text-cyan-600 hover:text-cyan-700 transition"
          >
            <Settings size={26} />
          </button>
        )}
      </div>

      {mode ? (
        <form
          onSubmit={handleEdit}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Name</label>
            <input
              value={name}
              type="text"
              onChange={(e) => setName(e.target.value)}
              className="border rounded-lg px-3 py-2 outline-none focus:border-cyan-600"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Age</label>
            <input
              value={age}
              type="number"
              onChange={(e) => setAge(e.target.value)}
              className="border rounded-lg px-3 py-2 outline-none focus:border-cyan-600"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="border rounded-lg p-2 cursor-pointer"
            />
          </div>

          <button
            type="submit"
            className="mt-2 bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-lg transition cursor-pointer"
          >
            Save Changes
          </button>
        </form>
      ) : (
        <div className="flex flex-col items-center text-center gap-4">
          <Image
            src={profile.img}
            alt="Profile"
            width={140}
            height={140}
            className="rounded-full object-cover border-4 border-cyan-600 shadow-md"
          />

          <h2 className="text-2xl font-bold text-gray-800">
            {profile.name}
          </h2>

          <div className="grid grid-cols-2 gap-4 w-full mt-2">
            <div className="bg-gray-100 rounded-lg p-3">
              <p className="text-sm text-gray-500">Age</p>
              <p className="font-semibold">{profile.age}</p>
            </div>

            <div className="bg-gray-100 rounded-lg p-3">
              <p className="text-sm text-gray-500">Gender</p>
              <p className="font-semibold">Male</p>
            </div>

            <div className="bg-gray-100 rounded-lg p-3">
              <p className="text-sm text-gray-500">Role</p>
              <p className="font-semibold">Admin</p>
            </div>

            <div className="bg-gray-100 rounded-lg p-3">
              <p className="text-sm text-gray-500">ID</p>
              <p className="font-semibold">#1</p>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
);
};

export default Page;
