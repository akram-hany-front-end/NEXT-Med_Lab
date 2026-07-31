"use client";
import { PlusCircle, SquarePen, Trash, XCircle } from "lucide-react";
import { useState } from "react";

type Results = {
  id: number;
  name: string;
  test: string;
  testResult: string;
  comment: string;
};

const intialResults: Results[] = [
  {
    id: 1,
    name: "Ahmed Ali",
    test: "CBC",
    testResult: "Normal",
    comment: "All blood counts are within the normal range.",
  },
  {
    id: 2,
    name: "Mona Hassan",
    test: "Blood Sugar",
    testResult: "145 mg/dL",
    comment: "Slightly elevated. Fasting test is recommended.",
  },
  {
    id: 3,
    name: "Omar Khaled",
    test: "Vitamin D",
    testResult: "22 ng/mL",
    comment: "Vitamin D deficiency detected.",
  },
  {
    id: 4,
    name: "Nour El Din",
    test: "Hemoglobin",
    testResult: "11.8 g/dL",
    comment: "Mild anemia is suspected.",
  },
  {
    id: 5,
    name: "Salma Adel",
    test: "Cholesterol",
    testResult: "210 mg/dL",
    comment: "Borderline high cholesterol level.",
  },
  {
    id: 6,
    name: "Youssef Ibrahim",
    test: "Creatinine",
    testResult: "1.0 mg/dL",
    comment: "Kidney function appears normal.",
  },
  {
    id: 7,
    name: "Fatma Mohamed",
    test: "TSH",
    testResult: "5.6 µIU/mL",
    comment: "Suggestive of hypothyroidism. Clinical correlation advised.",
  },
  {
    id: 8,
    name: "Mahmoud Samy",
    test: "Urinalysis",
    testResult: "Normal",
    comment: "No abnormal findings detected.",
  },
];

const Page = () => {
  // useStates()
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [test, setTest] = useState("");
  const [testResult, setTestResult] = useState("");
  const [search, setSearch] = useState("");
  const [results, setResults] = useState(intialResults);
  const [editingId, setEdingId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [comment, setComment] = useState("");

// FUNCTIONS
  // handle search function
  const filteredResults = results.filter(
    (result) =>
      result.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      result.test.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
  );
  // ResetForm Function
  const resetForm = () => {
    setComment("");
    setTestResult("");
    setTest("");
    setId("");
    setEdingId(null);
    setName("");
  };
  // handle delete function
  const handleDelete = (id: number) => {
    const updatedResults = results.filter((e) => e.id !== id);
    setResults(updatedResults);
  };

  // handle submit function
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !comment || !testResult || !id || !test) {
      alert("Please fill all fields");
      return;
    }
    if (editingId !== null) {
      // Edit
      setResults((prev) =>
        prev.map((item) =>
          editingId === item.id
            ? {
                ...item,
                name,
                test,
                testResult,
                comment,
              }
            : item,
        ),
      );
      setEdingId(null);
    } else {
      // Add
      const newResult = {
        name,
        id: Number(id),
        test,
        testResult,
        comment,
      };
      setResults((prev) => [...prev, newResult]);
      const pages = Math.ceil((results.length + 1) / resultsPerPage)
      setCurrentPage(pages)
    }
    resetForm();
    setOpen(false);
  };


  //handle edit function
  const handleEdit = (result: Results) => {
    setOpen(true);
    setComment(result.comment);
    setTestResult(result.testResult);
    setId(String(result.id));
    setTest(result.test);
    setEdingId(result.id);
    setName(result.name);
  };

  // pagination
  const resultsPerPage = 5; 
  const indexOfLastPage =  currentPage * resultsPerPage 
  const indexOfFirstPage = indexOfLastPage - resultsPerPage
  const totalPages = Math.ceil(filteredResults.length / resultsPerPage)
  const currentResults = filteredResults.slice(
  indexOfFirstPage,
  indexOfLastPage,
)
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
            className="relative flex flex-col border border-cyan-600 rounded-md p-2 gap-2 "
          >
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                resetForm();
              }}
              className="absolute top-2 right-2 cursor-pointer "
            >
              <XCircle size={22} className="text-red-500" />
            </button>
            <h1 className="mt-4">
              {editingId !== null ? "Edit" : "Add"} Test Result
            </h1>
            <div className="flex flex-col">
              <label htmlFor="name">Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                id="name"
                value={name}
                placeholder="Patient Name"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="id">ID</label>
              <input
                value={id}
                onChange={(e) => setId(e.target.value)}
                type="number"
                id="id"
                placeholder="Patient ID"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="test">Test</label>
              <input
                value={test}
                onChange={(e) => setTest(e.target.value)}
                type="text"
                id="test"
                placeholder="Test"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="result">Result</label>
              <input
                value={testResult}
                onChange={(e) => setTestResult(e.target.value)}
                type="text"
                id="result"
                placeholder="Test-Result"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="com">Comment</label>
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                type="text"
                id="com"
                placeholder="Comment"
              />
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
            {
currentResults.length === 0 ? (
  <tr>
    <td colSpan={6} className="text-center py-6 text-gray-500">
      No Results Found!
    </td>
  </tr>
) : (currentResults.map((result) => (
              <tr key={result.id}>
                <td className="p-3">{result.name}</td>
                <td className="p-3">{result.test}</td>
                <td className="p-3">{result.id}</td>
                <td className="p-3">{result.testResult}</td>
                <td className="p-3">{result.comment}</td>
                <td className="p-3 ">
                  <div className="flex gap-3">
                    <button onClick={() => handleDelete(result.id)}>
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
            )))

            }
            
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
