"use client";
import { Trash, PenBox, PlusCircle, XCircle } from "lucide-react";
import { useState } from "react";
type Appointment = {
  id: number;
  patient: string;
  test: string;
  date: string;
  time: string;
};

const Page = () => {
  const tests = [
    {
      testName: "CBC",
    },
    {
      testName: "PBC",
    },
    {
      testName: "FBS",
    },
    {
      testName: "TSH",
    },
    {
      testName: "RBSs",
    },
    {
      testName: "HCT",
    },
    {
      testName: "MCV",
    },
    {
      testName: "MCH",
    },
    {
      testName: "MCHC",
    },
    {
      testName: "PLT",
    },
    {
      testName: "W.B.C",
    },
    {
      testName: "ESR",
    },
    {
      testName: "ACCP",
    },
    {
      testName: "LFT",
    },
    {
      testName: "KFT",
    },
    {
      testName: "LP",
    },
    {
      testName: "SGPT",
    },
    {
      testName: "SGOT",
    },
    {
      testName: "C",
    },
  ];

  const thisWeakAppointments: Appointment[] = [
    {
      id: 1,
      patient: "Ahmed Ali",
      test: "CBC",
      date: "2026-07-28",
      time: "09:00 AM",
    },
    {
      id: 2,
      patient: "Salma Adel",
      test: "Blood Sugar",
      date: "2026-07-28",
      time: "09:30 AM",
    },
    {
      id: 3,
      patient: "Omar Khaled",
      test: "Vitamin D",
      date: "2026-07-28",
      time: "10:00 AM",
    },
    {
      id: 4,
      patient: "Fatma Mohamed",
      test: "TSH",
      date: "2026-07-28",
      time: "10:30 AM",
    },
    {
      id: 5,
      patient: "Youssef Ibrahim",
      test: "Urinalysis",
      date: "2026-07-28",
      time: "11:00 AM",
    },
    {
      id: 6,
      patient: "Nour El Din",
      test: "Creatinine",
      date: "2026-07-28",
      time: "11:30 AM",
    },
  ];

  // useStates ("")
  const [currentPage, setCurrentPage] = useState(1);
  const [patient, setPatient] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [test, setTest] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [appointments, setAppointments] = useState(thisWeakAppointments);
  const [search, setSearch] = useState("");

  const appointmentsPerPage = 5;
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;

  // reset form Function
  const resetForm = () => {
    setPatient("");
    setDate("");
    setTime("");
    setTest("");
    setEditingId(null);
  };

  // handle Delete Function
const handleDelete = (id: number) => {
    const updatedAppointments = appointments.filter((e) => e.id !== id);
    setAppointments(updatedAppointments);
};
  // handle Submit Function.
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!patient || !date || !time || !test) {
      alert("Please fill all fields");
      return;
    }
    if (editingId !== null) {
      //Edit
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment.id === editingId
            ? {
                ...appointment,
                date,
                test,
                patient,
                time,
              }
            : appointment,
        ),
      );
      setEditingId(null);
    } else {
      //Add
      const newAppointment = {
        date,
        id: Date.now(),
        test,
        patient,
        time,
      };
      setAppointments((prev) => [...prev, newAppointment]);
      const pages = Math.ceil((appointments.length + 1) / appointmentsPerPage);
      setCurrentPage(pages);
    }
    resetForm();
    setOpen(false);
  };
  // handle Edit Function
  const handleEdit = (appointment: Appointment) => {
    setEditingId(appointment.id);
    setPatient(appointment.patient);
    setTime(appointment.time);
    setDate(appointment.date);
    setTest(appointment.test);
    setOpen(true);
  };
  // handle Search Function
  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.patient.toLowerCase().includes(search.toLowerCase()) ||
      appointment.test.toLowerCase().includes(search.toLowerCase()),
  );
  //  Pagination
  const currentAppointments = filteredAppointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment,
  );
  const totalPages = Math.ceil(
    filteredAppointments.length / appointmentsPerPage,
  );
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-black">Appointments</h1>

      {/* TOP */}
      <div className="flex flex-col gap-5 p-5 items-center">
        <div className="flex flex-col gap-2 w-full max-w-sm">
          <label htmlFor="search" className="text-sm font-medium text-gray-700">
            Search Appointments
          </label>

          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            type="search"
            id="search"
            placeholder="Search by name or test..."
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
              className="absolute top-2 right-2 cursor-pointer"
            >
              <XCircle size={22} className="text-red-500" />
            </button>
            <h1 className="mt-4">
              {editingId !== null ? "Edit" : "Add"} You Employee
            </h1>
            <div className="flex flex-col">
              <label htmlFor="patient">Patient</label>
              <input
                value={patient}
                onChange={(e) => setPatient(e.target.value)}
                type="text"
                id="patient"
                placeholder="Patient Name"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="date">Date</label>
              <input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                type="date"
                id="date"
                placeholder="Appointment Date"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="time">Time</label>
              <input
                value={time}
                onChange={(e) => setTime(e.target.value)}
                type="time"
                id="time"
                placeholder="Appointment Time"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="status">Test</label>
              <select
                value={test}
                onChange={(e) => setTest(e.target.value)}
                name="test"
                id="test"
              >
                {tests.map((test) => (
                  <option key={test.testName} value={test.testName}>
                    {test.testName}
                  </option>
                ))}
              </select>
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

      {/* TABLE */}

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-5 border-b">
          <h2 className="text-xl font-semibold text-center">
            This weak Appointments
          </h2>
        </div>

        <table className="w-full text-start">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">Patient</th>
              <th className="text-left p-4">Test</th>
              <th className="text-left p-4">Date</th>
              <th className="text-left p-4">Time</th>
              <th className="text-center p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {currentAppointments.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No Appointments found.
                </td>
              </tr>
            ) : (
              currentAppointments.map((appointment) => (
                <tr
                  key={appointment.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-4">{appointment.patient}</td>
                  <td className="p-4">{appointment.test}</td>
                  <td className="p-4">{appointment.date}</td>
                  <td className="p-4">{appointment.time}</td>

                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleDelete(appointment.id)}
                      className="cursor-pointer p-1 rounded-full text-red-500 hover:bg-red-300  transition"
                    >
                      <Trash size={18} />
                    </button>
                    <button
                      onClick={() => handleEdit(appointment)}
                      className="cursor-pointer p-1 rounded-full text-yellow-500 hover:bg-yellow-200/60  transition"
                    >
                      <PenBox size={18} />
                    </button>
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
