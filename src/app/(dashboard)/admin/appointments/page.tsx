"use client";

import { useState } from "react";

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
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [duration, setDuration] = useState("30");
  //   Handle Change Function
  const handleDayChange = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };
  // Book Handler Function

  // Time converter to minutes Function
  const convertToMinutes = (time: string) => {
    const [hours, minutes] = time.split(":");
    
    const h = Number(hours);
    const m = Number(minutes);
 
    return h * 60 + m;
  };
  //   Handle Submit Function
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({
      selectedDays,
      startTime,
      endTime,
      duration,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-5 justify-center flex-col items-center p-5 "
    >
      <h1 className="text-3xl font-semibold text-blue-700">
        Manage your Appointments
      </h1>
      {/* DAYS MANAGEMENT */}
      <div className="flex gap-1 items-start flex-col p-5">
        <h2 className="text-2xl text-blue-600">Select Work Days</h2>

        {days.map((day) => (
          <label className="flex gap-1" key={day} htmlFor="">
            <input
              type="checkbox"
              checked={selectedDays.includes(day)}
              onChange={() => handleDayChange(day)}
              name=""
              id=""
            />
            <span className="text-blue-700 font-semibold">{day}</span>
          </label>
        ))}
      </div>
      {/* WORK DURATION */}
      <div className="flex flex-col gap-5">
        <h2 className="text-2xl text-blue-600">Select Work Hours</h2>

        <div className="flex flex-col items-center">
          <label htmlFor="start">Start Time</label>
          <input
            type="time"
            name="start"
            id="start"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="end">End Time</label>
          <input
            type="time"
            name="end"
            id="end"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
      </div>
      {/* Appointment DURATION */}
      <h2 className="text-2xl text-blue-600">Appointment Duration</h2>
      <select value={duration} onChange={(e) => setDuration(e.target.value)}>
        <option value="15">15 Minutes</option>
        <option value="30">30 Minutes</option>
        <option value="40">40 Minutes</option>
        <option value="50">50 Minutes</option>
        <option value="60">60 Minutes</option>
      </select>
      <button
        type="submit"
        className="cursor-pointer px-4 py-2 text-white hover:bg-blue-500 transition bg-blue-600 rounded-md "
      >
        Save Schedule
      </button>
    </form>
  );
};

export default Page;
