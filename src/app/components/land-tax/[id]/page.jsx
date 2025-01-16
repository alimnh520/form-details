"use client";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";

export default function Home({ params }) {
    const router = useRouter();
    const { id } = use(params);
    const [items, setItems] = useState([]);
    console.log(items);

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

    return (
        <div className="w-full h-screen bg-transparent backdrop-blur-md mx-auto p-4 flex flex-col space-y-5 items-center justify-center">
            <h1 className="text-2xl font-bold mb-4">User details</h1>
            {
                items.length > 0 ? (
                    items.filter((elem) => elem._id == id).map((currElm) => {
                        return (
                            <div className="flex flex-col items-start justify-center" key={currElm._id}>
                                <table className="table-fixed">
                                    <thead>
                                        <tr className="bg-gray-200 border border-gray-400">
                                            <th className="px-10 py-3 border-r border-r-gray-400">বিভাগ</th>
                                            <th className="px-10 py-3 border-r border-r-gray-400">জেলা</th>
                                            <th className="px-10 py-3 border-r border-r-gray-400">উপজেলা</th>
                                            <th className="px-10 py-3 border-r border-r-gray-400">মৌজা</th>
                                            <th className="px-10 py-3 border-r border-r-gray-400">খতিয়ান নাম</th>
                                            <th className="px-10 py-3">মোবাইল</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-l border-l-gray-400 border-r border-r-gray-400 border-b border-b-gray-400">
                                            <td className="text-center py-2 px-10 border-r border-r-gray-400">{currElm.divisionName}</td>
                                            <td className="text-center py-2 px-10 border-r border-r-gray-400">{currElm.districtName}</td>
                                            <td className="text-center py-2 px-10 border-r border-r-gray-400">{currElm.upazilaName}</td>
                                            <td className="text-center py-2 px-10 border-r border-r-gray-400">{currElm.mouzaName}</td>
                                            <td className="text-center py-2 px-10 border-r border-r-gray-400">{currElm.khatianName}</td>
                                            <td className="text-center py-2 px-10 border-r border-r-gray-400">{currElm.mobile}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )
                    })
                ) : (
                    <p>Loading......</p>
                )
            }

            <button className="bg-blue-500 text-white px-3 py-1 rounded relative top-10" onClick={() => router.back()}>Go back</button>
        </div>
    );
}