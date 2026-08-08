"use client";
import { PlusCircle, SquarePen, Trash, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

type Result = {
  _id: string;

  appointment: {
    _id: string;
    date: string;
    time: string;

    patient?: {
      _id: string;
      name: string;
      email: string;
    } | null;

    patientName?: string | null;

    test: {
      _id: string;
      testName: string;
      price: number;
    };
  };

  patient?: {
    _id: string;
    name: string;
    email: string;
  } | null;

  employee: {
    _id: string;
    name: string;
  };

  result: string;
  comment: string;
};

const Page = () => {
  // useStates()
  const [open, setOpen] = useState(false);
  const [appointments, setAppointments] = useState<
    {
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
    }[]
  >([]);
  const [testResult, setTestResult] = useState("");
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [editingId, setEdingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [comment, setComment] = useState("");
  const [appointmentId, setAppointmentId] = useState("");
  // FUNCTIONS
  // GET results from API
  const fetchedResults = async () => {
    const res = await fetch("/api/result");
    const data = await res.json();
    setResults(data.results);
  };

  const fetchedAppointments = async () => {
    const res = await fetch("/api/appointments");
    const data = await res.json();

    setAppointments(data.appointments);
  };
  // load fetched data on page auto
  useEffect(() => {
    const load = async () => {
      await fetchedResults();
      await fetchedAppointments();
    };
    load();
  }, []);
  // handle search function
  const filteredResults = results.filter((result) => {
    const patientName = result.patient?.name || "";
    const testName = result.appointment?.test?.testName || "";

    return (
      patientName.toLowerCase().includes(search.toLowerCase()) ||
      testName.toLowerCase().includes(search.toLowerCase())
    );
  });
  // ResetForm Function
  const resetForm = () => {
    setComment("");
    setTestResult("");
    setAppointmentId("");
    setEdingId(null);
  };
  // handle delete function
  const handleDelete = async (_id: string) => {
    try {
      const res = await fetch(`/api/result/${_id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Something went wrong");
        return;
      }

      await fetchedResults();

      alert("Result deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };
  // handle submit function
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!testResult || !comment) {
      alert("Please fill all fields");
      return;
    }

    try {
      // EDIT
      if (editingId !== null) {
        const res = await fetch(`/api/result/${editingId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            result: testResult,
            comment,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          alert(data.message || "Something went wrong");
          return;
        }

        await fetchedResults();

        alert("Result updated successfully");

        resetForm();
        setOpen(false);

        return;
      }

      // ADD
      if (!appointmentId) {
        alert("Please select an appointment");
        return;
      }

      const res = await fetch("/api/result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appointment: appointmentId,
          result: testResult,
          comment,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Something went wrong");
        return;
      }

      await fetchedResults();

      alert("Result added successfully");

      resetForm();
      setOpen(false);
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  //handle edit function
  const handleEdit = (result: Result) => {
    setOpen(true);
    setComment(result.comment);
    setTestResult(result.result);
    setAppointmentId(result.appointment._id);
    setEdingId(result._id);
  };

  // pagination
  const resultsPerPage = 5;
  const indexOfLastPage = currentPage * resultsPerPage;
  const indexOfFirstPage = indexOfLastPage - resultsPerPage;
  const totalPages = Math.ceil(filteredResults.length / resultsPerPage);
  const currentResults = filteredResults.slice(
    indexOfFirstPage,
    indexOfLastPage,
  );
  return (
    <div className=" flex flex-col">
      <h1 className="p-4 text-4xl font-semibold ">Results</h1>

      {/* TOP */}
      <div className="flex flex-col gap-5 p-5 items-center">
        <div className="flex flex-col gap-2 w-full max-w-sm ">
          <label htmlFor="search" className="text-sm font-medium text-gray-700">
            Search Results
          </label>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
            className="relative flex flex-col border border-cyan-600 rounded-md p-4 gap-3"
          >
            {/* Appointment */}
            <div className="flex flex-col">
              <label htmlFor="appointment">Appointment</label>

              <select
                id="appointment"
                value={appointmentId}
                onChange={(e) => setAppointmentId(e.target.value)}
                disabled={editingId !== null}
              >
                <option value="">Select Appointment</option>

                {appointments.map((appointment) => (
                  <option key={appointment._id} value={appointment._id}>
                    {appointment.patient?.name ||
                      appointment.patientName ||
                      "Unknown Patient"}{" "}
                    - {appointment.test.testName} -{new Date(appointment.date).toLocaleDateString("en-GB")} -{" "}
                    {appointment.time}
                  </option>
                ))}
              </select>
            </div>

            {/* Result */}
            <div className="flex flex-col">
              <label htmlFor="result">Result</label>

              <input
                value={testResult}
                onChange={(e) => setTestResult(e.target.value)}
                type="text"
                id="result"
                placeholder="Test Result"
              />
            </div>

            {/* Comment */}
            <div className="flex flex-col">
              <label htmlFor="comment">Comment</label>

              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                type="text"
                id="comment"
                placeholder="Comment"
              />
            </div>

            <button
              type="submit"
              className="cursor-pointer bg-cyan-600 p-3 rounded-full text-white"
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
              <th className="p-3 text-left">Test</th>
              <th className="p-3 text-left">Id</th>
              <th className="p-3 text-left">Result</th>
              <th className="p-3 text-left">Comment</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentResults.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
                  No Results Found!
                </td>
              </tr>
            ) : (
              currentResults.map((result) => (
                <tr key={result._id} className="border-b">
                  <td className="p-3">
                  {result.patient?.name ||
  result.appointment?.patient?.name ||
  result.appointment?.patientName ||
  "Unknown Patient"}
                  </td>
                  <td className="p-3">{result.appointment.test.testName}</td>

                  <td className="p-3">
                    {result.patient?._id ||
                      result.appointment?.patient?._id ||
                      "-"}
                  </td>
                  <td className="p-3">{result.result}</td>

                  <td className="p-3">{result.comment}</td>

                  <td className="p-3">
                    <div className="flex gap-3">
                      <button onClick={() => handleDelete(result._id)}>
                        <Trash
                          size={18}
                          className="text-red-600 cursor-pointer"
                        />
                      </button>

                      <button onClick={() => handleEdit(result)}>
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
