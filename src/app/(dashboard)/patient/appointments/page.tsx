"use client";

import { useState } from "react";

const availableSlots = [
  "09:00",
  "09:15",
  "09:30",
  "09:45",
  "10:00",
  "10:15",
  "10:30",
  "10:45",
];

const days = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];
const schedule = {
  Saturday: ["09:00", "09:15", "09:30"],
  Sunday: ["10:00", "10:15", "10:30"],
  Monday: ["11:00", "11:15", "11:30"],
  Tuesday: ["09:00", "09:15", "09:30"],
  Wednesday: ["10:00", "10:15", "10:30"],
  Thursday: ["11:00", "11:15", "11:30"],
  Friday: [],
};
const Page = () => {
  const [selectedSlot, setSelectedSlot] = useState("");
  const [selectedDay, setSelectedDay] = useState("Saturday");
  const todaySlots = schedule[selectedDay as keyof typeof schedule];

  console.log(selectedDay)

  return (
    <div className="flex flex-col items-center my-auto gap-55">
      <div className="flex flex-col items-center gap-3">
        <h1 className="mb-15 text-2xl font-semibold text-blue-600 ">
          Book Appointment
        </h1>

        <span className="text-xl font-semibold">Choose Day</span>
        <select
        value={selectedDay}
        onChange={(e) =>  setSelectedDay(e.target.value)}
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
      <div className="flex flex-col items-center gap-6">
        <div className="">
          <span className="text-xl font-semibold">Available Slots</span>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3 ">
          {
          todaySlots.length === 0 ? (
            <p className="text-blue-600 ">There are no available appointments for this day.</p>
          ) : (
          
          
          todaySlots.map((slot) => (
            <div
              onClick={ () => {
                if (slot === selectedSlot){
                    setSelectedSlot("")
                }else{
                    setSelectedSlot(slot)
                }
              }  }
              key={slot}
              className={`border cursor-pointer hover:bg-blue-200 transition rounded-lg py-2 px-1 text-center bg-blue-50 text-blue-700 font-medium  ${slot === selectedSlot ? "bg-yellow-500 text-black hover:bg-yellow-500" : "bg-blue-50 text-blue-700 hover:bg-blue-200"}`}
            >
              {slot}
            </div>
          )))}
        </div>
    
        <button onClick={  () =>  {if (selectedSlot === "") {
  alert("Please select a booking time.");
  return;
}}} className="p-2 cursor-pointer bg-blue-500 rounded-md hover:bg-blue-400 transition text-white">
          Book Appointment
        </button>
        
      </div>
    </div>
  );
};

export default Page;
