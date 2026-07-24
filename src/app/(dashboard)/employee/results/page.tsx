"use client";
import { PlusCircle, SquarePen, Trash, XCircle } from "lucide-react";
import { useState } from "react";
const Results = [
  {
    id: 1,
    name: "Ahmed Ali",
    test: "K",
    result:"18/20",
    comment:"fsfsfsefsefsef"

  },
  {
    id: 2,
    name: "Mona Hassan",
    test: "K",
    result:"18/20",
    comment:"fsfsfsefsefsef"
   
  },
  {
    id: 3,
    name: "Omar Khaled",
    test: "K",
    result:"18/20",
    comment:"fsfsfsefsefsef"

  },
  {
    id: 4,
    name: "Nour El Din",
    test: "K",
    result:"18/20",
    comment:"fsfsfsefsefsef"
  },
  {
    id: 5,
    name: "Salma Adel",
    test: "K",
    result:"18/20",
    comment:"fsfsfsefsefsef"
    
  },
  {
    id: 6,
    name: "Youssef Ibrahim",
    test: "K",
    result:"18/20",
    comment:"fsfsfsefsefsef"
  },
  {
    id: 7,
    name: "Fatma Mohamed",
    test: "K",
    result:"18/20",
    comment:"fsfsfsefsefsef"
  },
  {
    id: 8,
    name: "Mahmoud Samy",
    test: "K",
    result:"18/20",
    comment:"fsfsfsefsefsef"

  },
];
const Page = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className=" flex flex-col">
      <h1 className="p-4 text-4xl font-semibold ">Results</h1>
      {/* TOP */}
      <div className="flex flex-col gap-5 p-5 items-center">
        <button onClick={() => setOpen(!open)}>
          <PlusCircle
            size={25}
            className="hover:text-cyan-700 transition cursor-pointer text-yellow-600"
          />
        </button>
        {open && (
        <form className="relative flex flex-col border border-cyan-600 rounded-md p-2 gap-2 ">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-2 right-2 cursor-pointer "
          >
            <XCircle size={22} className="text-red-500" />
          </button>
          <h1 className="mt-4">Add Test Result</h1>
          <div className="flex flex-col">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Patient Name" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="id">ID</label>
            <input type="number" id="id" placeholder="Patient ID" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="test">Test</label>
            <input type="text" id="test" placeholder="Test" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="result">Result</label>
            <input type="text" id="result" placeholder="Test-Result" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="com">Comment</label>
            <input type="text" id="com" placeholder="Comment" />
          </div>
    
          <button
            className="cursor-pointer bg-cyan-600 p-3 rounded-full text-white hover:bg-cyan-500 self-end"
            type="submit"
          >
            Submit
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
            {Results.map((result) => (
              <tr key={result.id}>
                <td className="p-3">{result.name}</td>
                <td className="p-3">{result.test}</td>
                <td className="p-3">{result.id}</td>
                <td className="p-3">{result.result}</td>
                <td className="p-3">{result.comment}</td>
                <td className="p-3 ">
                  <div className="flex gap-3">
                    <button>
                      <Trash
                        size={18}
                        className="text-red-600 cursor-pointer"
                      />
                    </button>
                    <button>
                      <SquarePen
                        size={18}
                        className="text-blue-600 cursor-pointer"
                      />
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
