import { useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import axios from "axios";
import CustomerInfoCard from "../../components/CustomerInfoCard";
import Spinner from "../../components/Spinner";
import useUserState from "../../hooks/userUseState";
import CreateButton from "../../components/CreateButton";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

interface User {
  _id: string;
  name: string;
  email?: string;
  address?: string;
}

const AdminHome = () => {
  const userState = useUserState();
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setSearchAttempted(true);
    // Send a GET request to the server to search for users based on the searchQuery
    try {
      const response = await axios.get(
        `http://localhost:3000/users/search?query=${searchQuery}`
      );
      // Extract search results data from the response
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    navigate("/orderlog");
  };

  return (
    <>
      <div>
        <div className="top-36 left-0 right-0 flex justify-center items-center mt-8">
          <span className="font-bold text-white text-3xl">
            Velkommen til din Admin side, {userState?.name}
          </span>
        </div>

        <div className="p-8 flex items-start justify-end absolute top-[-10px] right-36">
          <Button
            text="Order log"
            className="text-black border-tertiary hover:bg-[#e6ecf0] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
            onClick={handleClick}
          />
        </div>
        <CreateButton />

        <form
          className="max-w-md mx-auto flex justify-center items-center relative mt-8"
          onSubmit={handleSearch}
        >
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            type="search"
            id="default-search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Søg på kundens navn eller email"
            required
          />
          <button
            type="submit"
            className="absolute right-2.5 bottom-2.5 bg-tertiary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <HiMagnifyingGlass className="text-white" />
          </button>
        </form>

        <div className="mt-40">
          {searchResults.length > 0 && (
            <h1 className="font-bold text-black text-2xl flex justify-center my-10">
              Vælg hvilken kunde du ønsker at se
            </h1>
          )}
          {loading ? (
            <Spinner />
          ) : searchAttempted ? (
            searchResults.length > 0 ? (
              searchResults.map((user) => (
                <CustomerInfoCard
                  key={user._id}
                  name={user.name}
                  address={user.address || "Adresse ikke tilgængelig"}
                  email={user.email || "Email ikke tilgængelig"}
                  userId={user._id}
                />
              ))
            ) : (
              <div className="text-center my-10">
                <span className="text-2xl font-semibold">
                  Ingen kunde(r) fundet
                </span>
              </div>
            )
          ) : null}
        </div>
      </div>
    </>
  );
};

export default AdminHome;
