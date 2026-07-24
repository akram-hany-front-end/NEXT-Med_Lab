"use client";
import { PlusCircle, SquarePen, Trash, XCircle } from "lucide-react";
import { useState } from "react";
const patients = [
  {
    id: 1,
    name: "Ahmed Ali",
    email: "ahmed.ali@nextlab.com",
    gender: "Male",
    age: 28,
    phone: "01012345678",
    status: "Active",
  },
  {
    id: 2,
    name: "Mona Hassan",
    email: "mona.hassan@nextlab.com",
    gender: "Female",
    age: 31,
    phone: "01123456789",
    status: "Active",
  },
  {
    id: 3,
    name: "Omar Khaled",
    email: "omar.khaled@nextlab.com",
    gender: "Male",
    age: 26,
    phone: "01234567890",
    status: "On Leave",
  },
  {
    id: 4,
    name: "Nour El Din",
    email: "nour.eldin@nextlab.com",
    gender: "Male",
    age: 35,
    phone: "01567891234",
    status: "Active",
  },
  {
    id: 5,
    name: "Salma Adel",
    email: "salma.adel@nextlab.com",
    gender: "Female",
    age: 24,
    phone: "01098765432",
    status: "Inactive",
  },
  {
    id: 6,
    name: "Youssef Ibrahim",
    email: "youssef.ibrahim@nextlab.com",
    gender: "Male",
    age: 30,
    phone: "01187654321",
    status: "Active",
  },
  {
    id: 7,
    name: "Fatma Mohamed",
    email: "fatma.mohamed@nextlab.com",
    gender: "Female",
    age: 27,
    phone: "01211223344",
    status: "Active",
  },
  {
    id: 8,
    name: "Mahmoud Samy",
    email: "mahmoud.samy@nextlab.com",
    gender: "Male",
    age: 33,
    phone: "01522334455",
    status: "Suspended",
  },
];
const Page = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className=" flex flex-col">
      <h1 className="p-4 text-4xl font-semibold ">Patients</h1>
      {/* TOP */}
      <div className="flex flex-col gap-5 p-5 items-center">
        <button onClick={() => setOpen(!open)}>
          <PlusCircle
            size={25}
            className="hover:text-cyan-700 transition cursor-pointer text-yellow-600"
          />
        </button>
        {open && (
          <form className="relative flex flex-col border border-cyan-600 rounded-md p-2 gap-2 ">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 cursor-pointer "
            >
              <XCircle size={22} className="text-red-500" />
            </button>
            <h1 className="mt-4">Add You Patient</h1>
            <div className="flex flex-col">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Patient Name" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input type="text" id="email" placeholder="Patient Email" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="age">Age</label>
              <input type="text" id="age" placeholder="Patient Age" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phone">Phone</label>
              <input type="text" id="phone" placeholder="Patient Phone" />
            </div>
            
            <button
              className="cursor-pointer bg-cyan-600 p-3 rounded-full text-white hover:bg-cyan-500 self-end"
              type="submit"
            >
              Submit
            </button>
          </form>
        )}
      </div>
      {/* BOTTOM */}
      <div className="table">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Age</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td className="p-3">{patient.name}</td>
                <td className="p-3">{patient.email}</td>
                <td className="p-3">{patient.age}</td>
                <td className="p-3">{patient.phone}</td>
                <td className="p-3 ">
                  <div className="flex gap-3">
                    <button>
                      <Trash
                        size={18}
                        className="text-red-600 cursor-pointer"
                      />
                    </button>
                    <button>
                      <SquarePen
                        size={18}
                        className="text-blue-600 cursor-pointer"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
