"use client";

import {
  Calendar,
  UserRound,
  FileText,
  Trash,
} from "lucide-react";
import { useEffect, useState } from "react";

type Appointment = {
  _id: string;
  patient: {
    name: string;
    email: string;
  } | null;
  patientName: string | null;
  test: {
    testName: string;
    price: number;
  } | null;
  date: string;
  time: string;
  status: string;
};

const Page = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [weeklyAppointments, setWeeklyAppointments] = useState(0);
  const [employeesCount, setEmployeesCount] = useState(0);
  const [patientsCount, setPatientsCount] = useState(0);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [loading, setLoading] = useState(true);

  // =========================
  // Fetch Dashboard
  // =========================
const fetchPatients = async () => {
  try {
    const res = await fetch("/api/users?role=Patient");
    const data = await res.json();

    if (!res.ok) {
      console.error(data.message);
      return;
    }

    setPatientsCount(data.users?.length || 0);
  } catch (error) {
    console.error("Failed to fetch patients:", error);
  }
};
  const fetchDashboard = async () => {
    try {
      const res = await fetch("/api/dashboard", {
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to fetch dashboard");
        return;
      }

      setAppointments(data.todayAppointments || []);
      setWeeklyAppointments(data.weeklyAppointments || 0);
      setTotalAppointments(data.totalAppointments);
      setEmployeesCount(data.employeesCount || 0);
    } catch (error) {
      console.error("Failed to fetch dashboard:", error);
      alert("Failed to fetch dashboard");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Load Dashboard
  // =========================

  useEffect(() => {
    const load = async ()=> {
      await     fetchDashboard();
      await     fetchPatients();

    }
    load()
  }, []);

  // =========================
  // Delete Appointment
  // =========================

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to delete appointment");
        return;
      }

      // Remove deleted appointment from today's list
      setAppointments((prev) =>
        prev.filter((appointment) => appointment._id !== id),
      );

      // Since one appointment was deleted,
      // update weekly count as well.
      setWeeklyAppointments((prev) => Math.max(prev - 1, 0));
    } catch (error) {
      console.error("Delete appointment error:", error);
      alert("Something went wrong");
    }
  };


  return (
    <div className="flex flex-col gap-6">

      {/* ========================= */}
      {/* TOP CARDS */}
      {/* ========================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* This Week Appointments */}
        <div className="bg-cyan-100 rounded-xl shadow-md p-6 flex items-center justify-between">
          <div>
            <p className="text-cyan-800 text-sm font-semibold">
              This Week Appointments
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {loading ? "..." : weeklyAppointments}
            </h2>
          </div>

          <div className="bg-cyan-200 p-3 rounded-full">
            <Calendar
              className="text-cyan-600"
              size={28}
            />
          </div>
        </div>

        {/* Employees */}
        <div className="bg-green-100 rounded-xl shadow-md p-6 flex items-center justify-between">
          <div>
            <p className="text-green-800 text-sm font-semibold">
              Employees
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {loading ? "..." : employeesCount}
            </h2>
          </div>

          <div className="bg-green-200 p-3 rounded-full">
            <UserRound
              className="text-green-600"
              size={28}
            />
          </div>
        </div>

        {/* Total Lab Cases */}
        <div className="bg-yellow-100 rounded-xl shadow-md p-6 flex items-center justify-between">
          <div>
            <p className="text-yellow-800 text-sm font-semibold">
              Total Lab Cases
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {loading ? "..." : totalAppointments}
            </h2>
          </div>

          <div className="bg-yellow-200 p-3 rounded-full">
            <FileText
              className="text-yellow-600"
              size={28}
            />
          </div>
        </div>
        {/* Total Patients In House */}
<div className="bg-purple-300/80 rounded-xl shadow-md p-6 flex items-center justify-between">
  <div>
    <p className="text-purple-800 text-sm font-semibold">
      Patients
    </p>

    <h2 className="text-3xl font-bold mt-2">
      {loading ? "..." : patientsCount}
    </h2>
  </div>

  <div className="bg-purple-300 p-3 rounded-full">
    <UserRound
      className="text-purple-600"
      size={28}
    />
  </div>
</div>
      </div>

      {/* ========================= */}
      {/* TODAY APPOINTMENTS */}
      {/* ========================= */}

      <div className="bg-white rounded-xl shadow-md overflow-hidden">

        <div className="p-5 border-b">
          <h2 className="text-xl font-semibold text-center">
            Today's Appointments
          </h2>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-start">

            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-4">
                  Patient
                </th>

                <th className="text-left p-4">
                  Test
                </th>

                <th className="text-left p-4">
                  Date
                </th>

                <th className="text-left p-4">
                  Time
                </th>

                <th className="text-center p-4">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-8 text-gray-500"
                  >
                    Loading appointments...
                  </td>
                </tr>
              ) : appointments.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-8 text-gray-500"
                  >
                    No appointments for today.
                  </td>
                </tr>
              ) : (
                appointments.map((appointment) => (
                  <tr
                    key={appointment._id}
                    className="border-b hover:bg-gray-50 transition"
                  >

                    <td className="p-4">
                      {appointment.patient?.name ||
                        appointment.patientName ||
                        "Unknown"}
                    </td>

                    <td className="p-4">
                      {appointment.test?.testName ||
                        "Unknown Test"}
                    </td>

                    <td className="p-4">
                      {new Date(
                        appointment.date,
                      ).toLocaleDateString("en-CA")}
                    </td>

                    <td className="p-4">
                      {appointment.time}
                    </td>

                    <td className="p-4 text-center">
                      <button
                        onClick={() =>
                          handleDelete(appointment._id)
                        }
                        className="cursor-pointer p-1 rounded-full text-red-500 hover:bg-red-100 transition"
                      >
                        <Trash size={18} />
                      </button>
                    </td>

                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default Page;