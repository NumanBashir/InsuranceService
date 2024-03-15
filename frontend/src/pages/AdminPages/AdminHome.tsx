import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { HiMagnifyingGlass } from "react-icons/hi2";
import axios from "axios";

interface Service {
  name: string;
}

interface User {
  _id: string;
  name: string;
  email?: string;
  address?: string;
}

const AdminHome = () => {
  const location = useLocation();
  const state = location.state as { name: string };
  const [serviceName, setServiceName] = useState<Service[]>([]);
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:3000/users/search?query=${searchQuery}`
      );

      setSearchResults(response.data); // Assuming the response is the array of users
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <>
      <div>
        <div className="absolute top-36 left-0 right-0 flex justify-center items-center">
          <span className="font-bold text-white text-3xl">
            Velkommen til din Admin side, {state.name}
          </span>
        </div>

        <form
          className="max-w-md mx-auto absolute top-56 left-0 right-0 justify-center items-center"
          onSubmit={handleSearch}
        >
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div>
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Søg på en kundes ID, navn eller email"
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <HiMagnifyingGlass />
            </button>
          </div>
        </form>
        <div className="flex justify-center items-center">
          <div className="bg-white shadow-lg rounded-2xl py-8 m-4 w-1/2 max-w-2xl">
            {searchResults.length > 0 ? (
              searchResults.map((user) => (
                <div key={user._id} className="flex flex-col items-center mb-4">
                  <span className="text-lg font-semibold">{user.name}</span>
                  {user.email && (
                    <span className="text-sm text-gray-600">{user.email}</span>
                  )}
                  {user.address && (
                    <span className="text-sm text-gray-600">
                      {user.address}
                    </span>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">
                Ingen resultater fundet
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
