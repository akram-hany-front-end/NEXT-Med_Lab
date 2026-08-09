"use client";

import { Settings, XCircle } from "lucide-react";
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
  const [mode, setMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [profile, setProfile] = useState<User | null>(null);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  // GET  USER
  const fetchProfile = async () => {
    try {
      setLoading(true);


      const res = await fetch("/api/register");

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to fetch profile");
        return;
      }

      const user = data.user;

      if (!user) {
        alert("User not found");
        return;
      }

      setProfile(user);
      setName(user.name || "");
      setAge(String(user.age || ""));


    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const load = async () => {
      await fetchProfile();

    }
    load()
  }, []);

  // UPDATE USER
  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();


    if (!profile?._id) {
      alert("User ID not found");
      return;
    }

    if (!name || !age) {
      alert("Please Fill All Fields");
      return;
    }

    try {
      setSaving(true);
      const res = await fetch(`/api/register/${profile._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          age,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to update profile");
        return;
      }

      setProfile(data.user);

      setName(data.user.name || "");
      setAge(String(data.user.age || ""));

      setMode(false);

      alert("Profile updated successfully");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setSaving(false);
    }


  };

  if (loading) {
    return (<div className="p-5"> <p>Loading profile...</p> </div>
    );
  }

  if (!profile) {
    return (<div className="p-5"> <p>User not found.</p> </div>
    );
  }

  return (<div className="max-w-xl mx-auto p-6">


    {/* HEADER */}
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">
        Profile
      </h1>

      {mode ? (
        <button
          onClick={() => {
            setMode(false);
            setName(profile.name);
            setAge(String(profile.age));
          }}
          className="text-red-500 hover:text-red-600 transition"
        >
          <XCircle size={28} />
        </button>
      ) : (
        <button
          onClick={() => {
            setName(profile.name);
            setAge(String(profile.age));
            setMode(true);
          }}
          className="text-cyan-600 hover:text-cyan-700 transition"
        >
          <Settings size={26} />
        </button>
      )}
    </div>

    {/* EDIT MODE */}
    {mode ? (
      <form
        onSubmit={handleEdit}
        className="flex flex-col gap-4"
      >

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium ">
            Name
          </label>

          <input
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
            className="border rounded-lg px-3 py-2 outline-none focus:border-cyan-600"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">
            Age
          </label>

          <input
            value={age}
            type="number"
            onChange={(e) => setAge(e.target.value)}
            className="border rounded-lg px-3 py-2 outline-none focus:border-cyan-600"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="mt-2 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-400 text-white py-2 rounded-lg transition cursor-pointer"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>

      </form>
    ) : (

      /* VIEW MODE */
      <div className="flex flex-col items-center text-center gap-5">


        <h2 className="text-2xl font-bold text-gray-800">
          {profile.name}
        </h2>

        <p className="text-gray-500">
          {profile.email}
        </p>

        <div className="grid grid-cols-2 gap-4 w-full mt-2">

          <div className="bg-gray-100 rounded-lg p-3">
            <p className="text-sm text-gray-500">
              Age
            </p>

            <p className="font-semibold">
              {profile.age}
            </p>
          </div>

          <div className="bg-gray-100 rounded-lg p-3">
            <p className="text-sm text-gray-500">
              Gender
            </p>

            <p className="font-semibold">
              {profile.gender}
            </p>
          </div>

          <div className="bg-gray-100 rounded-lg p-3">
            <p className="text-sm text-gray-500">
              Role
            </p>

            <p className="font-semibold capitalize">
              {profile.role}
            </p>
          </div>

          <div className="bg-gray-100 rounded-lg p-3">
            <p className="text-sm text-gray-500">
              ID
            </p>

            <p className="font-semibold text-xs break-all">
              {profile._id}
            </p>
          </div>

          <div className="bg-gray-100 rounded-lg p-3 col-span-2">
            <p className="text-sm text-gray-500">
              Phone
            </p>

            <p className="font-semibold">
              {profile.phone}
            </p>
          </div>

        </div>
      </div>
    )}
  </div>


  );
};

export default Page;
