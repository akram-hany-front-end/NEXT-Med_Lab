"use client"
import { Calendar, UserRound, FileText, Trash,  } from "lucide-react";
import { useState } from "react";
type Appointment = {
  id: number;
  patient: string;
  test: string;
  date: string;
  time: string;
};

 
const Page = () => {
const todayAppointments: Appointment[] = [
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
    const [appointments,setAppointments] = useState(todayAppointments)




  // handle Delete Function 
  const handleDelete = (id: number) => {
const updatedAppointments = appointments.filter((e)=> e.id !== id )
setAppointments(updatedAppointments)
  }
 return (
  <div className="p-6 space-y-8">
    <h1 className="text-3xl font-bold text-black">
      Admin Dashboard
    </h1>

    {/* TOP */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-cyan-100 rounded-xl shadow-md p-6 flex items-center justify-between">
        <div>
          <p className="text-cyan-800 text-sm font-semibold">This Week Appointments</p>
          <h2 className="text-3xl font-bold mt-2">124</h2>
        </div>

        <div className="bg-cyan-200 p-3 rounded-full">
          <Calendar className="text-cyan-600" size={28} />
        </div>
      </div>

      <div className="bg-green-100 rounded-xl shadow-md p-6 flex items-center justify-between">
        <div>
          <p className="text-green-800 text-sm font-semibold">Employees</p>
          <h2 className="text-3xl font-bold mt-2">12</h2>
        </div>

        <div className="bg-green-200 p-3 rounded-full">
          <UserRound className="text-green-600" size={28} />
        </div>
      </div>

      <div className="bg-yellow-100 rounded-xl shadow-md p-6 flex items-center justify-between">
        <div>
          <p className="text-yellow-800 text-sm font-semibold">Total Lab Cases</p>
          <h2 className="text-3xl font-bold mt-2">860</h2>
        </div>

        <div className="bg-yellow-100 p-3 rounded-full">
          <FileText className="text-yellow-600" size={28} />
        </div>
      </div>
    </div>

    {/* TABLE */}

    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-5 border-b">
        <h2 className="text-xl font-semibold text-center">
          Today is Appointments
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
          {appointments.map((appointment) => (
            <tr
              key={appointment.id}
              className="border-b hover:bg-gray-50 transition"
            >
              <td className="p-4">{appointment.patient}</td>
              <td className="p-4">{appointment.test}</td>
              <td className="p-4">{appointment.date}</td>
              <td className="p-4">{appointment.time}</td>

              <td className="p-4 text-center">
                <button  onClick={()=> handleDelete(appointment.id)}   className="cursor-pointer p-1 rounded-full text-red-500 hover:bg-red-300  transition">
                  <Trash size={18} />
                </button>
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
