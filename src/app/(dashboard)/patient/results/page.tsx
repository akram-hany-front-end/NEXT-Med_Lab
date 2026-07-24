"use client";
import { Eye,Download } from "lucide-react";
const Results = [
  {
    id: 1,
    name: "Ahmed Ali",
    test: "K",
    result: "18/20",
    comment: "fsfsfsefsefsef",
  },
  {
    id: 2,
    name: "Mona Hassan",
    test: "K",
    result: "18/20",
    comment: "fsfsfsefsefsef",
  },
  {
    id: 3,
    name: "Omar Khaled",
    test: "K",
    result: "18/20",
    comment: "fsfsfsefsefsef",
  },
  {
    id: 4,
    name: "Nour El Din",
    test: "K",
    result: "18/20",
    comment: "fsfsfsefsefsef",
  },
  {
    id: 5,
    name: "Salma Adel",
    test: "K",
    result: "18/20",
    comment: "fsfsfsefsefsef",
  },
  {
    id: 6,
    name: "Youssef Ibrahim",
    test: "K",
    result: "18/20",
    comment: "fsfsfsefsefsef",
  },
  {
    id: 7,
    name: "Fatma Mohamed",
    test: "K",
    result: "18/20",
    comment: "fsfsfsefsefsef",
  },
  {
    id: 8,
    name: "Mahmoud Samy",
    test: "K",
    result: "18/20",
    comment: "fsfsfsefsefsef",
  },
];
const Page = () => {
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
            {Results.map((result) => (
              <tr key={result.id}>
                <td className="p-3">{result.name}</td>
                <td className="p-3">{result.test}</td>
                <td className="p-3">{result.id}</td>
                <td className="p-3">{result.result}</td>
                <td className="p-3">{result.comment}</td>
                <td className="p-3 ">
                  <div className="flex gap-3 ">
                    <button className="flex items-center flex-col">
                      <Eye
                        size={18}
                        className="text-blue-500 cursor-pointer"
                      />
                      view
                    </button>
                    <button className="flex items-center flex-col">
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
