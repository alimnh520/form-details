"use client";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";

export default function Home({ params }) {
    const router = useRouter();
    const { id } = use(params);
    const [items, setItems] = useState([]);

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

    return (
        <div className="w-full h-screen bg-transparent backdrop-blur-md mx-auto p-4 flex flex-col space-y-5 items-center justify-center sm:p-0 sm:h-auto">
            <h1 className="text-2xl font-bold mb-4">User details</h1>
            {
                items.length > 0 ? (
                    items.filter((elem) => elem._id == id).map((currElm) => {
                        return (
                            <div className="flex flex-col items-start justify-center" key={currElm._id}>
                                <table className="table-auto">
                                    <thead>
                                        <tr className="bg-gray-200 border border-gray-400">
                                            <th className="px-10 sm:px-2 py-3 border-r border-r-gray-400">বিভাগ</th>
                                            <th className="px-10 sm:px-2 py-3 border-r border-r-gray-400">জেলা</th>
                                            <th className="px-10 sm:px-2 py-3 border-r border-r-gray-400">উপজেলা</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-l border-l-gray-400 border-r border-r-gray-400 border-b border-b-gray-400">
                                            <td className="text-center py-2 px-10 sm:px-2 border-r border-r-gray-400">{currElm.divisionName}</td>
                                            <td className="text-center py-2 px-10 sm:px-2 border-r border-r-gray-400">{currElm.districtName}</td>
                                            <td className="text-center py-2 px-10 sm:px-2 border-r border-r-gray-400">{currElm.upazilaName}</td>
                                        </tr>
                                    </tbody>
                                    <thead className="">
                                        <tr className="bg-gray-200 border border-gray-400">
                                            <th className="px-10 sm:px-2 py-3 border-r border-r-gray-400">মৌজা</th>
                                            <th className="px-10 sm:px-2 py-3 border-r border-r-gray-400">খতিয়ান নাম</th>
                                            <th className="px-10 sm:px-2 py-3 border-r border-r-gray-400">NID নাম্বার</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-l border-l-gray-400 border-r border-r-gray-400 border-b border-b-gray-400">
                                            <td className="text-center py-2 px-10 sm:px-2 border-r border-r-gray-400">{currElm.mouzaName}</td>
                                            <td className="text-center py-2 px-10 sm:px-2 border-r border-r-gray-400">{currElm.khatianName}</td>
                                            <td className="text-center py-2 px-10 sm:px-2 border-r border-r-gray-400">{currElm.nidNum}</td>
                                        </tr>
                                    </tbody>
                                    <thead>
                                        <tr className="bg-gray-200 border border-gray-400">
                                            <th className="px-10 sm:px-2 py-3 border-r border-r-gray-400">জন্ম তারিখ</th>
                                            <th className="px-10 sm:px-2 py-3">মোবাইল</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-l border-l-gray-400 border-r border-r-gray-400 border-b border-b-gray-400">
                                            <td className="text-center py-2 px-10 sm:px-2 border-r border-r-gray-400">{currElm.dobNum.slice(0, 10)}</td>
                                            <td className="text-center py-2 px-10 sm:px-2 border-r border-r-gray-400">0{currElm.mobile}</td>
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