"use client";
import { PlusCircle, SquarePen, Trash, XCircle } from "lucide-react";
import { useState, useEffect } from "react";

type Test = {
    _id: string;
    testName: string;
    price: number;
};


const Page = () => {
    // useStates()
    const [open, setOpen] = useState(false);
    const [testName, setTestName] = useState("");
    const [price, setPrice] = useState("");
    const [search, setSearch] = useState("");
    const [results, setResults] = useState<Test[]>([]);
    const [editingId, setEdingId] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    // FUNCTIONS

    // fetch tests from api
    const fetchTests = async () => {
        const res = await fetch("/api/tests");

        const data = await res.json();

        setResults(data.tests);
    };
    useEffect(() => {
        const loadTests = async () => {
            await fetchTests();
        };

        loadTests();
    }, []);
    
    // handle search function
    const filteredResults = results.filter(
        (data) =>
            data.testName.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
    // ResetForm Function
    const resetForm = () => {
        setPrice("");
        setEdingId(null);
        setTestName("");
    };
    // handle delete function
    const handleDelete = async (id: string) => {

        const res = await fetch(`/api/tests/${id}`, {
            method: "DELETE",
        });

        const data = await res.json();
        if (!res.ok) {
            alert(data.message);
            return;
        }

        await fetchTests();


    };

    // handle submit function
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!testName || !price) {
            alert("Please fill all fields");
            return;
        }
        if (editingId !== null) {
            // Edit
            const res = await fetch(`/api/tests/${editingId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    testName,
                    price: Number(price),
                }),
            })
            const updatedData = await res.json();
            if (!res.ok) {
                alert(updatedData.message);
                return;
            }
            await fetchTests();

            setEdingId(null);
        } else {
            // Add
            const res = await fetch("/api/tests", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    testName: testName,
                    price: Number(price),
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message);
                return;
            }

            await fetchTests();


        }
        resetForm();
        setOpen(false);
    };


    //handle edit function
    const handleEdit = (test: Test) => {
        setOpen(true);
        setPrice(String(test.price));
        setEdingId(test._id);
        setTestName(test.testName);
    };

    // pagination
    const resultsPerPage = 5;
    const indexOfLastPage = currentPage * resultsPerPage
    const indexOfFirstPage = indexOfLastPage - resultsPerPage
    const totalPages = Math.ceil(filteredResults.length / resultsPerPage)
    const currentResults = filteredResults.slice(
        indexOfFirstPage,
        indexOfLastPage,
    )
    return (
        <div className=" flex flex-col">
            <h1 className="p-4 text-4xl font-semibold ">Tests</h1>

            {/* TOP */}
            <div className="flex flex-col gap-5 p-5 items-center">
                <div className="flex flex-col gap-2 w-full max-w-sm ">
                    <label htmlFor="search" className="text-sm font-medium text-gray-700">
                        Search Tests
                    </label>

                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        type="search"
                        id="search"
                        placeholder="Search by name or price..."
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
                            {editingId !== null ? "Edit" : "Add"} Test
                        </h1>
                        <div className="flex flex-col">
                            <label htmlFor="testName">Test Name</label>
                            <input
                                onChange={(e) => setTestName(e.target.value)}
                                type="text"
                                id="testName"
                                value={testName}
                                placeholder="Patient Name"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="price">Price</label>
                            <input
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                type="number"
                                id="price"
                                placeholder="Test Price"
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
                            <th className="p-3 text-left">Test</th>
                            <th className="p-3 text-left">Price</th>
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
                            ) : (currentResults.map((test) => (
                                <tr key={test._id}>
                                    <td className="p-3">{test.testName}</td>
                                    <td className="p-3">{test.price} $</td>
                                    <td className="p-3 ">
                                        <div className="flex gap-3">
                                            <button onClick={() => handleDelete(test._id)}>
                                                <Trash
                                                    size={18}
                                                    className="text-red-600 cursor-pointer"
                                                />
                                            </button>
                                            <button onClick={() => handleEdit(test)}>
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
