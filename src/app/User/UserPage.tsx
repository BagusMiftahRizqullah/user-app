"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function UserPage() {
    const [user, setUser] = useState({ name: "" });
    const searchParams = useSearchParams();
    const userId = searchParams.get("id"); // Get ID from URL

    console.log("ID USER NYA", userId);

    const getOneUser = async () => {
        if (!userId) return; // Avoid making request if userId is missing

        try {
            const response = await axios.get(
                `https://users-backend-tawny.vercel.app/users/${userId}`
            );

            if (response.status === 200) {
                console.log("RESPONSE USER ONE NEW", response.data?.response);
                console.log("ID USER NEW ONE", response.data?.response["_id"]);
                setUser(response.data?.response);
            }
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    const handleShare = async () => {
        const url = window.location.href; // Get full URL

        try {
            await navigator.clipboard.writeText(url); // Copy to clipboard
            alert("Link copied to clipboard! 📋");
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    useEffect(() => {
        getOneUser();
    }, [userId]); // Runs only when userId changes

    return (
        <div className="bg-[#1153A2] flex h-screen items-center justify-center">
            <div className="bg-white max-w-full w-[80%] sm:w-[420px] px-6 sm:px-10 py-8 rounded-lg border shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex flex-wrap items-center">
                    <div className="w-full">
                        <div className="flex flex-col gap-2 items-center">
                            <p className="text-[24px] text-[#000000]">This page is for</p>
                            <div className="h-8" />
                            <p className="text-[32px] font-bold text-[#000000]">
                                {user?.name || "Loading..."}
                            </p>
                            <div className="h-8" />

                            <div className="flex w-full flex-col gap-2 items-center">
                                <button
                                    type="button"
                                    onClick={handleShare}
                                    className="flex-1 cursor-pointer rounded-lg border border-primary bg-[#1153A2] py-2 px-4 text-white transition hover:bg-opacity-90"
                                >
                                    Share
                                </button>

                                <button
                                    type="button"
                                    className="cursor-pointer rounded-lg border border-primary bg-[#1153A2] py-2 px-4 text-white transition hover:bg-opacity-90"
                                >
                                    Send Notification
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
