"use client";
import { Eye, Download } from "lucide-react";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
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
  const [results, setResults] = useState<Result[]>([]);

  // GET results from API

  const fetchedResults = async () => {
    try {
      const res = await fetch("/api/result");

      const data = await res.json();

      if (!res.ok) {
        console.error(data.message);
        return;
      }

      setResults(data.results);
    } catch (error) {
      console.error(error);
    }
  };
  // load fetched data on page auto
  useEffect(() => {
    const load = async () => {
      await fetchedResults();
    };
    load();
  }, []);
  // handle Download function
  const handleDownload = (item: Result) => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("Medical Laboratory Result", 20, 20);

  doc.setFontSize(12);

  doc.text(`Patient Name: ${item.patient?.name || "Unknown"}`, 20, 40);

  doc.text(
    `Patient ID: ${item.patient?._id || "-"}`,
    20,
    50
  );

  doc.text(
    `Test: ${item.appointment.test.testName}`,
    20,
    60
  );

  doc.text(`Result: ${item.result}`, 20, 70);

  doc.text(`Comment: ${item.comment || "-"}`, 20, 80);

doc.text(
  `Date: ${new Date(item.appointment.date).toLocaleDateString("en-GB")}`,
  20,
  90
);
  doc.text(
    `Time: ${item.appointment.time}`,
    20,
    100
  );

  doc.save(
    `${item.patient?.name || "patient"}-${item.appointment.test.testName}-result.pdf`
  );
};
  return (
    <div className=" flex flex-col">
      <h1 className="p-4 text-4xl font-semibold ">Results</h1>
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
            {results.map((item) => (
              <tr key={item._id}>
                <td className="p-3">
                  {item.patient?.name ||
                    item.appointment?.patient?.name ||
                    item.appointment?.patientName ||
                    "Unknown Patient"}
                </td>

                <td className="p-3">
                  {item.appointment?.test?.testName || "-"}
                </td>

                <td className="p-3">
                  {item.patient?._id || item.appointment?.patient?._id || "-"}
                </td>

                <td className="p-3">{item.result}</td>

                <td className="p-3">{item.comment || "-"}</td>

                <td className="p-3">
                  <div className="flex  ">
                  

                    <button onClick={()=> handleDownload(item)} className="flex items-center flex-col">
                      <Download
                        size={18}
                        className="text-gray-800 cursor-pointer"
                      />
                      Download
                    </button>
                  </div>
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
