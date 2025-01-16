"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Home() {
    const router = useRouter();
    const [items, setItems] = useState([]);
    const [deleteDesign, setDeleteDesign] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("../../api/get-landTax2");
                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        }
        fetchData();
    }, []);

    const deleteItem = async (id) => {
        try {
            const response = await fetch(`/api/delete-landTax2?id=${id}`, {
                method: "DELETE",
            });
            const result = await response.json();

            if (response.ok) {
                setItems(items.filter((item) => item._id !== id));
                // alert("Item deleted successfully!");
                setDeleteDesign(false);
            } else {
                alert(`Failed to delete item: ${result.error}`);
            }
        } catch (error) {
            console.error("Failed to delete item:", error);
        }
    };

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center px-20">
            {deleteDesign &&
                <div className=" absolute size-32 border-8 border-transparent border-t-red-500 border-r-red-500 rounded-full animate-spin"></div>
            }
            <h1 className="text-2xl font-bold w-full border-b border-b-gray-400 text-center py-5">Data List</h1>

            <div className="w-10/12 h-auto pt-5 flex flex-col items-center justify-center space-y-3">
                <p className="w-full text-start px-2">মোবাইল নাম্বার :</p>
                {items.length > 0 ? (
                    items.map((item) => (
                        <div
                            key={item._id}
                            className="w-full flex justify-between items-center border border-gray-300"
                        >
                            <p className="w-1/2 p-2 h-full border-r border-r-gray-300">{item.mobile}</p>
                            <div className="flex items-center justify-center space-x-5 p-2">
                                <Link href={`/components/land-tax2/${item._id}`} className="bg-red-500 text-white px-3 py-1 rounded">See Details</Link>
                                <button
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                    onClick={() => {
                                        deleteItem(item._id);
                                        setDeleteDesign(true);
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <button className="bg-blue-500 text-white px-3 py-1 rounded relative top-10" onClick={() => router.back()}>Go back</button>
        </div>
    );
}
