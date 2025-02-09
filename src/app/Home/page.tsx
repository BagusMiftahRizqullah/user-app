"use client";
import axios from "axios";
import { useRouter } from "next/navigation"; // Correct import
import React, { useState } from "react";

export default function HomePage() {
  const router = useRouter(); // Correct use of useRouter
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://users-backend-tawny.vercel.app/users/create",
        {
          name: username,
        }
      );

      if(response.status === 200){
        console.log("RESPONSE USER NEW",response.data?.response);
        console.log("ID USER NEW",response.data?.response["_id"]);
        setLoading(false);
  
        // Navigate to /User with query params
        router.push(`/User?id=${response.data?.response["_id"]}`);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      setLoading(false);
    }
  };


  


  return (
    <div className="bg-[#1153A2] flex h-screen items-center justify-center">
    <div className="bg-white max-w-full w-[80%] sm:w-[420px] px-6 sm:px-10 py-8 rounded-lg border shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex flex-wrap items-center">
        <div className="w-full">
          <div className="flex flex-row gap-2 items-center">
            <p className="text-[24px] sm:text-[32px] font-bold text-[#000000] dark:text-white">
              Create Users
            </p>
          </div>
  
           <form onSubmit={handleCreate}>
            <div className="mb-2">
              <p
                
                className="text-[14px] sm:text-[15px] mb-2.5 block font-bold text-black"
              >
                Name
              </p>
              <div className="relative">
                <input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  placeholder="Example. Jhon"
                  className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input"
                />
              </div>
            </div>

            <div className="flex flex-wrap justify-between items-center mb-5">
              {/* Placeholder for 'Lupa Password' */}
              <div />
              <button
                disabled={loading}
                type="submit"
              
                className={`cursor-pointer rounded-lg border border-primary bg-[#1153A2] py-2 px-4 text-white transition hover:bg-opacity-90 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  );
}
