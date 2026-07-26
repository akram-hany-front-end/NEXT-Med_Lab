"use client";
import { PlusCircle, SquarePen, Trash, XCircle } from "lucide-react";
import { useState } from "react";

type Patient = {
  id: number;
  name: string;
  email: string;
  age: number;
  phone: string;
  status: string;
};
const Page = () => {
  const initialPatients: Patient[] = [
    {
      id: 1,
      name: "Ahmed Ali",
      email: "ahmed.ali@nextlab.com",
      age: 28,
      phone: "01012345678",
      status: "Active",
    },
    {
      id: 2,
      name: "Mona Hassan",
      email: "mona.hassan@nextlab.com",
      age: 31,
      phone: "01123456789",
      status: "Active",
    },
    {
      id: 3,
      name: "Omar Khaled",
      email: "omar.khaled@nextlab.com",
      age: 26,
      phone: "01234567890",
      status: "On Leave",
    },
    {
      id: 4,
      name: "Nour El Din",
      email: "nour.eldin@nextlab.com",
      age: 35,
      phone: "01567891234",
      status: "Active",
    },
    {
      id: 5,
      name: "Salma Adel",
      email: "salma.adel@nextlab.com",
      age: 24,
      phone: "01098765432",
      status: "Inactive",
    },
    {
      id: 6,
      name: "Youssef Ibrahim",
      email: "youssef.ibrahim@nextlab.com",
      age: 30,
      phone: "01187654321",
      status: "Active",
    },
    {
      id: 7,
      name: "Fatma Mohamed",
      email: "fatma.mohamed@nextlab.com",
      age: 27,
      phone: "01211223344",
      status: "Active",
    },
    {
      id: 8,
      name: "Mahmoud Samy",
      email: "mahmoud.samy@nextlab.com",
      age: 33,
      phone: "01522334455",
      status: "Suspended",
    },
  ];
  // useStates ("")
  const [currentPage, setCurrentPage] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [search, setSearch] = useState("");
  const [phone, setPhone] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [patients, setPatients] = useState(initialPatients);
  const [open, setOpen] = useState(false);

  const patientsPerPage = 5;
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;

  // reset form Function
  const resetForm = () => {
    setName("");
    setEmail("");
    setAge("");
    setPhone("");
    setEditingId(null);
  };
  // handle Search Function
  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(search.toLowerCase()) ||
      patient.email.toLowerCase().includes(search.toLowerCase()),
  );
  // pafination
  const currentPatients = filteredPatients.slice(
    indexOfFirstPatient,
    indexOfLastPatient,
  );
  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);
  // handle Delete Function
  const handleDelete = (id: number) => {
    const updatedPatients = patients.filter((e) => e.id !== id);

    setPatients(updatedPatients);

    const pages = Math.ceil(updatedPatients.length / patientsPerPage);

    if (currentPage > pages) {
      setCurrentPage(pages || 1);
    }
  };
  // handle Submit Function

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email || !age || !phone) {
      alert("Please fill all fields");
      return;
    }
    if (editingId !== null) {
      //Edit
      setPatients((prev) =>
        prev.map((patient) =>
          patient.id === editingId
            ? {
                ...patient,
                name,
                email,
                age: Number(age),
                phone,
              }
            : patient,
        ),
      );
      setEditingId(null);
    } else {
      //Add
      const newPatient = {
        id: Date.now(),
        name,
        email,
        age: Number(age),
        phone,
        status,
      };
      setPatients((prev) => [...prev, newPatient]);
      const pages = Math.ceil((patients.length + 1) / patientsPerPage);
      setCurrentPage(pages);
    }
    resetForm();
    setOpen(false);
  };
  // handle Edit function
  const handleEdit = (patient: Patient) => {
    setEditingId(patient.id);
    setEmail(patient.email);
    setName(patient.name);
    setAge(String(patient.age));
    setPhone(patient.phone);
    setOpen(true);
  };

  return (
    <div className=" flex flex-col">
      <h1 className="p-4 text-4xl font-semibold ">Patients</h1>
      {/* TOP */}
      <div className="flex flex-col gap-5 p-5 items-center">
        <div className="flex flex-col gap-2 w-full max-w-sm">
          <label htmlFor="search" className="text-sm font-medium text-gray-700">
            Search Patients
          </label>

          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            type="search"
            id="search"
            placeholder="Search by name or email..."
            className="rounded-lg border border-gray-300 px-4 py-2 outline-none transition-all duration-200 focus:border-blue-600 focus:ring-2 focus:ring-cyan-200"
          />
        </div>
        <button
          onClick={() => {
            setOpen(!open);
            resetForm();
          }}
        >
          <PlusCircle
            size={25}
            className="hover:text-cyan-700 transition cursor-pointer text-yellow-600"
          />
        </button>
        {open && (
          <form
            onSubmit={handleSubmit}
            className="relative flex flex-col border border-cyan-600 rounded-md p-2 gap-2 "
          >
            <button
              onClick={() => {
                setOpen(false);
                resetForm();
              }}
              className="absolute top-2 right-2 cursor-pointer "
            >
              <XCircle size={22} className="text-red-500" />
            </button>
            <h1 className="mt-4">
              {editingId !== null ? "Edit" : "Add"} You Patient
            </h1>
            <div className="flex flex-col">
              <label htmlFor="name">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                id="name"
                placeholder="Employee Name"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                id="email"
                placeholder="Employee Email"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="age">Age</label>
              <input
                value={age}
                onChange={(e) => setAge(e.target.value)}
                type="number"
                id="age"
                placeholder="Employee Age"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phone">Phone</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                id="phone"
                placeholder="Employee Phone"
              />
            </div>

            <button
              className="cursor-pointer bg-cyan-600 p-3 rounded-full text-white hover:bg-cyan-500 self-end"
              type="submit"
            >
              {editingId !== null ? "Update" : "Submit"}
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
            {currentPatients.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
                  No Patients found.
                </td>
              </tr>
            ) : (
              currentPatients.map((patient) => (
                <tr key={patient.id}>
                  <td className="p-3">{patient.name}</td>
                  <td className="p-3">{patient.email}</td>
                  <td className="p-3">{patient.age}</td>
                  <td className="p-3">{patient.phone}</td>
                  <td className="p-3 ">
                    <div className="flex gap-3">
                      <button onClick={() => handleDelete(patient.id)}>
                        <Trash
                          size={18}
                          className="text-red-600 cursor-pointer"
                        />
                      </button>
                      <button onClick={() => handleEdit(patient)}>
                        <SquarePen
                          size={18}
                          className="text-blue-600 cursor-pointer"
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="flex gap-2 mt-5 justify-center">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1 ? "bg-cyan-600 text-white" : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
