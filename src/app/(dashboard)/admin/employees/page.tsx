"use client";
import { PlusCircle, SquarePen, Trash, XCircle } from "lucide-react";
import { useState } from "react";

type Employee = {
  id: number;
  name: string;
  email: string;
  age: number;
  phone: string;
  status: string;
};
const Page = () => {
  const initialEmployees: Employee[] = [
    {
      id: 1,
      name: "Ahmed Ali",
      email: "ahmed.ali@nextlab.com",
      age: 28,
      phone: "01012345678",
      status: "Active",
    },
    {
      id: 2,
      name: "Mona Hassan",
      email: "mona.hassan@nextlab.com",
      age: 31,
      phone: "01123456789",
      status: "Active",
    },
    {
      id: 3,
      name: "Omar Khaled",
      email: "omar.khaled@nextlab.com",
      age: 26,
      phone: "01234567890",
      status: "On Leave",
    },
    {
      id: 4,
      name: "Nour El Din",
      email: "nour.eldin@nextlab.com",
      age: 35,
      phone: "01567891234",
      status: "Active",
    },
    {
      id: 5,
      name: "Salma Adel",
      email: "salma.adel@nextlab.com",
      age: 24,
      phone: "01098765432",
      status: "Inactive",
    },
    {
      id: 6,
      name: "Youssef Ibrahim",
      email: "youssef.ibrahim@nextlab.com",
      age: 30,
      phone: "01187654321",
      status: "Active",
    },
    {
      id: 7,
      name: "Fatma Mohamed",
      email: "fatma.mohamed@nextlab.com",
      age: 27,
      phone: "01211223344",
      status: "Active",
    },
    {
      id: 8,
      name: "Mahmoud Samy",
      email: "mahmoud.samy@nextlab.com",
      age: 33,
      phone: "01522334455",
      status: "Suspended",
    },
  ];

  // useStates ("")
  const [currentPage, setCurrentPage] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [search, setSearch] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("Active");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [employees, setEmployees] = useState(initialEmployees);
  const [open, setOpen] = useState(false);

  const employeesPerPage = 5;
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;

  // reset form Function
  const resetForm = () => {
    setName("");
    setEmail("");
    setAge("");
    setPhone("");
    setStatus("Active");
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
  const handleDelete = (id: number) => {
    const updatedEmployees = employees.filter((e) => e.id !== id);

    setEmployees(updatedEmployees);

    const pages = Math.ceil(updatedEmployees.length / employeesPerPage);

    if (currentPage > pages) {
      setCurrentPage(pages || 1);
    }
  };
  // handle Submit Function

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email || !age || !phone) {
      alert("Please fill all fields");
      return;
    }
    if (editingId !== null) {
      //Edit
      setEmployees((prev) =>
        prev.map((employee) =>
          employee.id === editingId
            ? {
                ...employee,
                name,
                email,
                age: Number(age),
                phone,
                status,
              }
            : employee,
        ),
      );
      setEditingId(null);
    } else {
      //Add
      const newEmployee = {
        id: Date.now(),
        name,
        email,
        age: Number(age),
        phone,
        status,
      };
      setEmployees((prev) => [...prev, newEmployee]);
      const pages = Math.ceil((employees.length + 1) / employeesPerPage);
      setCurrentPage(pages);
    }
   resetForm();
    setOpen(false);
  };
  // handle Edit function
  const handleEdit = (employee: Employee) => {
    setEditingId(employee.id);
    setEmail(employee.email);
    setName(employee.name);
    setAge(String(employee.age));
    setPhone(employee.phone);
    setStatus(employee.status);
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
            <div className="flex flex-col">
              <label htmlFor="status">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                name="status"
                id="status"
              >
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Inactive">Inactive</option>
                <option value="Suspended">Suspended</option>
              </select>
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
                <tr key={employee.id}>
                  <td className="p-3">{employee.name}</td>
                  <td className="p-3">{employee.email}</td>
                  <td className="p-3">{employee.age}</td>
                  <td className="p-3">{employee.phone}</td>
                  <td className="p-3">{employee.status}</td>
                  <td className="p-3 ">
                    <div className="flex gap-3">
                      <button onClick={() => handleDelete(employee.id)}>
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
              ))
            )}
          </tbody>
        </table>{" "}
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
