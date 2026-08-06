"use client";

import { PenBoxIcon, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const days = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

const Page = () => {
  const { data: session } = useSession();
  const patientId = session?.user?.id;
  // useStates
  const [tests, setTests] = useState<
    {
      _id: string;
      testName: string;
      price: number;
    }[]
  >([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [selectedDay, setSelectedDay] = useState("Saturday");
  const [selectedTest, setSelectedTest] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [bookedAppointment, setBookedAppointment] = useState<
    {
      _id: string;
      patient: {
        name: string;
      };
     test: {
  _id: string;
  testName: string;
};
      date: string;
      time: string;
    }[]
  >([]);
  const [schedule, setSchedule] = useState<{
    days: string[];
    slots: string[];
  } | null>(null);

  const todaySlots =
    schedule && schedule.days.includes(selectedDay) ? schedule.slots : [];

  const myAppointments = bookedAppointment.filter(
    (item) => item.patient.name === session?.user?.name
  );

  const bookedSlots = bookedAppointment
    .filter(
      (item) =>
        new Date(item.date).toLocaleDateString("en-US", {
          weekday: "long",
        }) === selectedDay,
    )
    .map((item) => item.time);

  // fetch schedule from api
  const fetchSchedule = async () => {
    const res = await fetch("/api/schedules");
    const data = await res.json();
    setSchedule(data.schedules);
  };

  console.log(session);
  // fetch tests from api

  const fetchTests = async () => {
    const res = await fetch("/api/tests");
    const data = await res.json();
    setTests(data.tests);
  };
  const fetchAppointments = async () => {
    const res = await fetch("/api/appointments");
    const data = await res.json();
    setBookedAppointment(data.appointments);
  };
  // to load the schedule and tests when the component mounts
  useEffect(() => {
    const load = async () => {
      await fetchSchedule();
      await fetchTests();
      await fetchAppointments();
    };
    load();
  }, []);

  // handle book date
  const dayMap: Record<string, number> = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };
  const getNextDate = (day: string) => {
    const today = new Date();

    const targetDay = dayMap[day];
    const currentDay = today.getDay();

    let diff = targetDay - currentDay;

    if (diff <= 0) {
      diff += 7;
    }

    today.setDate(today.getDate() + diff);

    return today;
  };

  // handle POST appointment to the api
  const handleBook = async () => {
    if (!selectedSlot || !selectedDay || !selectedTest) {
      alert("Please select a test, day and slot.");
      return;
    }
    // ADD
    const res = await fetch("/api/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        patient: patientId, // Assuming you have the patient ID available
        test: selectedTest,
        date: getNextDate(selectedDay),
        time: selectedSlot,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      alert(data.message || "Something went wrong.");
      return;
    }
    alert("Appointment booked successfully.");
    await fetchAppointments();
    setSelectedSlot("");
  };

  // handle Update function 
  const handleUpdate = async () => {
  if (!editingId) return;

  const res = await fetch(`/api/appointments/${editingId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      patient: patientId,
      test: selectedTest,
      date: getNextDate(selectedDay),
      time: selectedSlot,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message || "Something went wrong.");
    return;
  }

  alert("Appointment updated successfully.");

  await fetchAppointments();

  setEditingId(null);
  setSelectedSlot("");
};
  // handle Delete function 
  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/appointments/${id}`, {
      method: "DELETE",
    });
    const data = await res.json()
    if (!res.ok) {
      alert(data.message || "Something went wrong.");
      return;
    }

    alert("Appointment deleted successfully.");

    await fetchAppointments();
  }
  return (
    <div className="flex flex-col items-center my-auto gap-55">
      <div className="flex flex-col items-center gap-3">
        <h1 className="mb-15 text-2xl font-semibold text-blue-600 ">
          Book Appointment
        </h1>
        {/* BOOKING SECTION  */}

        <div className="flex flex-col items-center gap-3">
          <span className="text-xl font-semibold">Choose Test</span>
          <select
            value={selectedTest}
            onChange={(e) => setSelectedTest(e.target.value)}
            name=""
            id=""
            className="bg-blue-400 text-white p-2 rounded-sm cursor-pointer hover:bg-blue-300 transition"
          >
            {tests.map((test) => (
              <option key={test._id} value={test._id}>
                {test.testName} : {test.price}$
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col items-center gap-3">
          <span className="text-xl font-semibold">Choose Day</span>
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            name=""
            id=""
            className="bg-blue-400 text-white p-2 rounded-sm cursor-pointer hover:bg-blue-300 transition"
          >
            {days.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-col items-center gap-6">
        <div className="">
          <span className="text-xl font-semibold">Available Slots</span>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3 ">
          {todaySlots.length === 0 ? (
            <p className="text-blue-600">
              There are no available appointments for this day.
            </p>
          ) : (
            todaySlots
              .filter((slot) => !bookedSlots.includes(slot))
              .map((slot) => (
                <div
                  key={slot}
                  onClick={() => {
                    if (slot === selectedSlot) {
                      setSelectedSlot("");
                    } else {
                      setSelectedSlot(slot);
                    }
                  }}
                  className={`border cursor-pointer hover:bg-blue-200 transition rounded-lg py-2 px-1 text-center ${slot === selectedSlot
                    ? "bg-yellow-500 text-black hover:bg-yellow-500"
                    : "bg-blue-50 text-blue-700 hover:bg-blue-200"
                    }`}
                >
                  {slot}
                </div>
              ))
          )}
        </div>

<button className="p-2 bg-blue-500 rounded-md cursor-pointer hover:bg-blue-400 transition  text-white" onClick={editingId ? handleUpdate : handleBook}>
  {editingId ? "Update Appointment" : "Book Appointment"}
</button>
        {/* BOOKED TABLE  */}
        <table className="flex flex-col items-center border border-black rounded-lg p-3 mt-5 justify-between w-150">
          <thead className="border-b border-black w-full  ">
            <tr className="flex gap-35">
              <td>Day</td>
              <td>Time</td>
              <td>Test</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody className="flex flex-col items-center rounded-lg p-2   gap-5 w-150">
            {myAppointments.length === 0 ? (
              <tr><td>No appointments yet</td></tr>
            ) : (
              myAppointments.map((item) => (
                <tr className="flex gap-32 border-b w-full" key={item._id}>
                  <td>{new Date(item.date).toLocaleDateString()}</td>
                  <td>{item.time}</td>
                  <td>{item.test.testName}</td>
                  <td>
                    <div className="">
                      <button onClick={() => handleDelete(item._id)}>
                        <Trash className="text-red-500 cursor-pointer hover:text-red-400 transition" />
                      </button>
                      <button
                        onClick={() => {
                          setEditingId(item._id);

                          setSelectedTest(item.test._id);
                          setSelectedSlot(item.time);

                          setSelectedDay(
                            new Date(item.date).toLocaleDateString("en-US", {
                              weekday: "long",
                            })
                          );
                        }}
                      >
                        <PenBoxIcon className="text-yellow-500 cursor-pointer hover:text-yellow-300 transition" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
