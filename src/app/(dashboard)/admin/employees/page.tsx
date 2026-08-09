"use client";
import { PlusCircle, SquarePen, Trash, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

type Employee = {
  _id: string;
  name: string;
  email: string;
  age: string | number;
  phone: string;
  role: string;
  gender: string;
};
const Page = () => {


  // useStates ("")
  const [currentPage, setCurrentPage] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [search, setSearch] = useState("");
  const [phone, setPhone] = useState("");
const [editingId, setEditingId] = useState<string | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [open, setOpen] = useState(false);

  const employeesPerPage = 5;
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;

  // get employees 
  const fetchEmployees = async () => {
    try {
      const res = await fetch("/api/users?role=Employee");

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to fetch employees");
        return;
      }

      setEmployees(data.users);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch employees");
    }
  };
  useEffect(() => {
    const load = async () => {
      await fetchEmployees();

    }
    load()
  }, []);
  // reset form Function
  const resetForm = () => {
    setName("");
    setEmail("");
    setAge("");
    setPhone("");
    setEditingId(null);
  };
  // handle Search Function
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.email.toLowerCase().includes(search.toLowerCase()),
  );
  // pafination
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee,
  );
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);
  // handle Delete Function
  const handleDelete = async (id: string) => {
  try {
    const res = await fetch(`/api/users/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to delete employee");
      return;
    }

    await fetchEmployees();

    alert("Employee deleted successfully");
  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  }
};
  // handle Submit Function

  const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  if (!name || !email || !age || !phone) {
    alert("Please fill all fields");
    return;
  }

  if (!editingId) return;

  try {
    const res = await fetch(`/api/users/${editingId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        age: Number(age),
        phone,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to update employee");
      return;
    }

    await fetchEmployees();

    resetForm();
    setOpen(false);

    alert("Employee updated successfully");
  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  }
};
  // handle Edit function
  const handleEdit = (employee: Employee) => {
  setEditingId(employee._id);
  setEmail(employee.email);
  setName(employee.name);
  setAge(String(employee.age));
  setPhone(employee.phone);
  setOpen(true);
};

  return (
    <div className=" flex flex-col">
      <h1 className="p-4 text-4xl font-semibold ">Employees</h1>
      {/* TOP */}
      <div className="flex flex-col gap-5 p-5 items-center">
        <div className="flex flex-col gap-2 w-full max-w-sm">
          <label htmlFor="search" className="text-sm font-medium text-gray-700">
            Search Employees
          </label>

          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            type="search"
            id="search"
            placeholder="Search by name or email..."
            className="rounded-lg border border-gray-300 px-4 py-2 outline-none transition-all duration-200 focus:border-blue-600 focus:ring-2 focus:ring-cyan-200"
          />
        </div>
      
        {open && (
          <form
            onSubmit={handleSubmit}
            className="relative flex flex-col border border-cyan-600 rounded-md p-2 gap-2 "
          >
            <button
              onClick={() => {
                setOpen(false);
                resetForm();
              }}
              className="absolute top-2 right-2 cursor-pointer"
            >
              <XCircle size={22} className="text-red-500" />
            </button>
            <h1 className="mt-4">
              {editingId !== null ? "Edit" : "Add"} You Employee
            </h1>
            <div className="flex flex-col">
              <label htmlFor="name">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                id="name"
                placeholder="Employee Name"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                id="email"
                placeholder="Employee Email"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="age">Age</label>
              <input
                value={age}
                onChange={(e) => setAge(e.target.value)}
                type="number"
                id="age"
                placeholder="Employee Age"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phone">Phone</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                id="phone"
                placeholder="Employee Phone"
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
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Age</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
                  No employees found.
                </td>
              </tr>
            ) : (
            currentEmployees.map((employee) => (
  <tr key={employee._id}>
    <td className="p-3">{employee.name}</td>
    <td className="p-3">{employee.email}</td>
    <td className="p-3">{employee.age}</td>
    <td className="p-3">{employee.phone}</td>

    <td className="p-3">
      <div className="flex gap-3">
        <button onClick={() => handleDelete(employee._id)}>
          <Trash
            size={18}
            className="text-red-600 cursor-pointer"
          />
        </button>

        <button onClick={() => handleEdit(employee)}>
          <SquarePen
            size={18}
            className="text-blue-600 cursor-pointer"
          />
        </button>
      </div>
    </td>
  </tr>
)))}
          </tbody>
        </table>{" "}
        <div className="flex gap-2 mt-5 justify-center">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-cyan-600 text-white" : "bg-gray-200"
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
