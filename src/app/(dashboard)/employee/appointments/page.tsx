"use client";
import { Trash, PenBox, PlusCircle, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

const days = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

type Appointment = {
  _id: string;

  patient?: {
    _id: string;
    name: string;
  } | null;

  patientName?: string | null;

  test: {
    _id: string;
    testName: string;
  };

  date: string;
  time: string;
};
const Page = () => {
  // useStates ("")
  const [currentPage, setCurrentPage] = useState(1);
  const [patient, setPatient] = useState("");
  const [time, setTime] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState<{
    days: string[];
    slots: string[];
  } | null>(null);
  const [test, setTest] = useState("");
  const [tests, setTests] = useState<
    {
      _id: string;
      testName: string;
      price: number;
    }[]
  >([]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [search, setSearch] = useState("");
  const todaySlots =
    slots && slots.days.includes(selectedDay) ? slots.slots : [];
  //fetch schedule from api

  const fetchSchedule = async () => {
    const res = await fetch("/api/schedules");
    const data = await res.json();

    setSlots(data.schedules);
  };
  //fetch appointments from api
  const fetchAppointments = async () => {
    const res = await fetch("/api/appointments");
    const data = await res.json();

    setAppointments(data.appointments);
  };
  //fetch tests from api
  const fetchTests = async () => {
    const res = await fetch("/api/tests");
    const data = await res.json();
    setTests(data.tests);
  };
  // to load the schedule and tests when the component mounts

  useEffect(() => {
    const load = async () => {
      await fetchAppointments();
      await fetchTests();
      await fetchSchedule();
    };
    load();
  }, []);
  const appointmentsPerPage = 5;
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;

  // reset form Function
  const resetForm = () => {
    setPatient("");
    setTime("");
    setTest("");
    setSelectedDay("Saturday");
    setEditingId(null);
  };
  // handle Delete Function
  const handleDelete = async (_id: string) => {
    try {
      const res = await fetch(`/api/appointments/${_id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Something went wrong!");
        return;
      }

      alert("Appointment deleted successfully.");

      await fetchAppointments();
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  // handle Submit Function.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!patient || !date || !time || !test) {
      alert("Please fill all fields");
      return;
    }

    try {
      // EDIT
      if (editingId !== null) {
        const res = await fetch(`/api/appointments/${editingId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            patientName: patient,
            patient: null,
            test,
            date,
            time,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          alert(data.message || "Something went wrong!");
          return;
        }

        alert("Appointment updated successfully.");

        await fetchAppointments();

        resetForm();
        setOpen(false);
        return;
      }

      // ADD
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientName: patient,
          test,
          date,
          time,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Something went wrong!");
        return;
      }

      alert("Appointment added successfully.");

      await fetchAppointments();

      resetForm();
      setOpen(false);
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };
  // handle Edit Function
const handleEdit = (appointment: Appointment) => {
  setEditingId(appointment._id);

  setPatient(
    appointment.patientName ||
      appointment.patient?.name ||
      "",
  );

  setTime(appointment.time);
  setDate(appointment.date);

  const dayName = new Date(appointment.date).toLocaleDateString(
    "en-US",
    {
      weekday: "long",
    },
  );

  setSelectedDay(dayName);

  setTest(appointment.test._id);

  setOpen(true);
};
  // handle Search Function
  const filteredAppointments = appointments.filter((appointment) => {
    const patientName =
      appointment.patient?.name || appointment.patientName || "";

    const testName = appointment.test?.testName || "";

    return (
      patientName.toLowerCase().includes(search.toLowerCase()) ||
      testName.toLowerCase().includes(search.toLowerCase())
    );
  });
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
                type="date"
                id="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);

                  const selectedDate = new Date(e.target.value);

                  const dayName = selectedDate.toLocaleDateString("en-US", {
                    weekday: "long",
                  });

                  setSelectedDay(dayName);
                  setTime("");
                }}
              />
            </div>
            <div className="flex flex-col">
              <label>Day</label>
              <input value={selectedDay} disabled readOnly />
            </div>

            <div className="flex flex-col">
              <label htmlFor="time">Time</label>

              <select
                name="time"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                disabled={todaySlots.length === 0}
              >
                <option value="">
                  {todaySlots.length === 0
                    ? "No available slots"
                    : "Select time"}
                </option>

                {todaySlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
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
                  <option key={test._id} value={test._id}>
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
                  key={appointment._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-4">
                    {appointment.patient?.name || appointment.patientName}{" "}
                  </td>
                  <td className="p-4">{appointment.test.testName}</td>
                  <td className="p-4">
                    {" "}
                    {new Date(appointment.date).toISOString().split("T")[0]}
                  </td>
                  <td className="p-4">{appointment.time}</td>

                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleDelete(appointment._id)}
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
