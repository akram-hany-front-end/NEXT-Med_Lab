
"use client";

import { SquarePen, Trash, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

type Patient = {
  _id: string;
  name: string;
  email: string;
  age: string | number;
  phone: string;
  role: string;
  gender: string;
};

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");

  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);

  const [patients, setPatients] = useState<Patient[]>([]);

  const [open, setOpen] = useState(false);

  const patientsPerPage = 5;

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;

  // =========================
  // GET PATIENTS
  // =========================

  const fetchPatients = async () => {
    try {
      const res = await fetch("/api/users?role=Patient");

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to fetch patients");
        return;
      }

      setPatients(data.users);
    } catch (error) {
      console.error("Fetch patients error:", error);
      alert("Failed to fetch patients");
    }
  };

  useEffect(() => {
    const load = async ()=> {
      await    fetchPatients();

    }
    load()
  }, []);

  // =========================
  // RESET FORM
  // =========================

  const resetForm = () => {
    setName("");
    setEmail("");
    setAge("");
    setPhone("");
    setEditingId(null);
  };

  // =========================
  // SEARCH
  // =========================

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(search.toLowerCase()) ||
      patient.email.toLowerCase().includes(search.toLowerCase()),
  );

  // =========================
  // PAGINATION
  // =========================

  const currentPatients = filteredPatients.slice(
    indexOfFirstPatient,
    indexOfLastPatient,
  );

  const totalPages = Math.ceil(
    filteredPatients.length / patientsPerPage,
  );

  // =========================
  // DELETE PATIENT
  // =========================

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this patient?",
    );

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to delete patient");
        return;
      }

      await fetchPatients();

      const newTotalPages = Math.ceil(
        (filteredPatients.length - 1) / patientsPerPage,
      );

      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }

      alert("Patient deleted successfully");
    } catch (error) {
      console.error("Delete patient error:", error);
      alert("Something went wrong");
    }
  };

  // =========================
  // EDIT PATIENT
  // =========================

  const handleEdit = (patient: Patient) => {
    setEditingId(patient._id);

    setName(patient.name);
    setEmail(patient.email);
    setAge(String(patient.age));
    setPhone(patient.phone);

    setOpen(true);
  };

  // =========================
  // PATCH PATIENT
  // =========================

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (!name || !email || !age || !phone) {
      alert("Please fill all fields");
      return;
    }

    if (!editingId) return;

    try {
      const res = await fetch(`/api/users/${editingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          age: Number(age),
          phone,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to update patient");
        return;
      }

      await fetchPatients();

      resetForm();
      setOpen(false);

      alert("Patient updated successfully");
    } catch (error) {
      console.error("Update patient error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="p-4 text-4xl font-semibold">
        Patients
      </h1>

      {/* TOP */}

      <div className="flex flex-col gap-5 p-5 items-center">
        {/* SEARCH */}

        <div className="flex flex-col gap-2 w-full max-w-sm">
          <label
            htmlFor="search"
            className="text-sm font-medium text-gray-700"
          >
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

        {/* EDIT FORM */}

        {open && (
          <form
            onSubmit={handleSubmit}
            className="relative flex flex-col border border-cyan-600 rounded-md p-4 gap-3 w-full max-w-sm"
          >
            {/* CLOSE */}

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                resetForm();
              }}
              className="absolute top-2 right-2 cursor-pointer"
            >
              <XCircle
                size={22}
                className="text-red-500"
              />
            </button>

            <h1 className="mt-2 text-lg font-semibold">
              Edit Patient
            </h1>

            {/* NAME */}

            <div className="flex flex-col">
              <label htmlFor="name">Name</label>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                id="name"
                placeholder="Patient Name"
                className="border rounded-md p-2"
              />
            </div>

            {/* EMAIL */}

            <div className="flex flex-col">
              <label htmlFor="email">Email</label>

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                placeholder="Patient Email"
                className="border rounded-md p-2"
              />
            </div>

            {/* AGE */}

            <div className="flex flex-col">
              <label htmlFor="age">Age</label>

              <input
                value={age}
                onChange={(e) => setAge(e.target.value)}
                type="number"
                id="age"
                placeholder="Patient Age"
                className="border rounded-md p-2"
              />
            </div>

            {/* PHONE */}

            <div className="flex flex-col">
              <label htmlFor="phone">Phone</label>

              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                id="phone"
                placeholder="Patient Phone"
                className="border rounded-md p-2"
              />
            </div>

            {/* UPDATE */}

            <button
              className="cursor-pointer bg-cyan-600 p-3 rounded-full text-white hover:bg-cyan-500 self-end"
              type="submit"
            >
              Update
            </button>
          </form>
        )}
      </div>

      {/* TABLE */}

      <div className="table">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="p-3 text-left">
                Name
              </th>

              <th className="p-3 text-left">
                Email
              </th>

              <th className="p-3 text-left">
                Age
              </th>

              <th className="p-3 text-left">
                Phone
              </th>

              <th className="p-3 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {currentPatients.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-6 text-gray-500"
                >
                  No Patients found.
                </td>
              </tr>
            ) : (
              currentPatients.map((patient) => (
                <tr key={patient._id}>
                  <td className="p-3">
                    {patient.name}
                  </td>

                  <td className="p-3">
                    {patient.email}
                  </td>

                  <td className="p-3">
                    {patient.age}
                  </td>

                  <td className="p-3">
                    {patient.phone}
                  </td>

                  <td className="p-3">
                    <div className="flex gap-3">
                      {/* DELETE */}

                      <button
                        onClick={() =>
                          handleDelete(patient._id)
                        }
                      >
                        <Trash
                          size={18}
                          className="text-red-600 cursor-pointer"
                        />
                      </button>

                      {/* EDIT */}

                      <button
                        onClick={() =>
                          handleEdit(patient)
                        }
                      >
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

        {/* PAGINATION */}

        <div className="flex gap-2 mt-5 justify-center">
          {Array.from(
            { length: totalPages },
            (_, i) => (
              <button
                key={i}
                onClick={() =>
                  setCurrentPage(i + 1)
                }
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-cyan-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;

