"use client"
import { PlusCircle, SquarePen, Trash } from "lucide-react";

const page = () => {
  return (
    <div className=" flex flex-col">
      <h1>Employees</h1>
      <div className="">
        <button>
          <PlusCircle size={18}   className="text-yellow-600"/>
        </button>
        
        <button>
          <Trash size={18}   className="text-red-600"/>
        </button>
        <button>
          {" "}
          <SquarePen size={18} className="text-blue-600" />
        </button>
      </div>
      <div className="table"></div>
    </div>
  );
};

export default page;
