"use client";
import React, { use, useEffect, useState } from "react";

export default function Home({ params }) {
    const { id } = use(params);
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

    return (
        <div className="w-full h-screen bg-transparent backdrop-blur-md mx-auto p-4 flex flex-col space-y-5 items-center justify-center bg-gray-600">
            <h1 className="text-2xl font-bold mb-4">User details</h1>
            {
                items.length > 0 ? (
                    items.filter((elem) => elem._id == id).map((currElm) => {
                        return (
                            <div className="flex flex-col items-start justify-center" key={currElm._id}>
                                <p >Name : {currElm.name}</p>
                                <p >Email : {currElm.email}</p>
                                <p >Age : {currElm.age}</p>
                                <p >Number : {currElm.number}</p>
                            </div>
                        )
                    })
                ) : (
                    <p>Loading.....</p>
                )
            }
        </div>
    );
}