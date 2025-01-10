"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Home() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("../../api/get");
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
            const response = await fetch(`/api/delete?id=${id}`, {
                method: "DELETE",
            });
            const result = await response.json();

            if (response.ok) {
                setItems(items.filter((item) => item._id !== id));
                alert("Item deleted successfully!");
            } else {
                alert(`Failed to delete item: ${result.error}`);
            }
        } catch (error) {
            console.error("Failed to delete item:", error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Data List</h1>
            {items.length > 0 ? (
                items.map((item) => (
                    <div
                        key={item._id}
                        className="flex justify-between items-center p-2 border-b"
                    >
                        <p>{item.name}</p>
                        <div className="flex items-center justify-center space-x-5">
                            <button
                                className="bg-red-500 text-white px-3 py-1 rounded"
                                onClick={() => deleteItem(item._id)}
                            >
                                Delete
                            </button>
                            <Link href={`/components/form/${item._id}`} className="bg-red-500 text-white px-3 py-1 rounded">See Details</Link>
                        </div>
                    </div>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
