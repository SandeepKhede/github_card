import React, { useState } from "react";
import axios from "axios";

const GitHubCard = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}`
      );
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching GitHub data:", error);
      alert('User not found')
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-md bg-white">
      <h1 className="text-3xl font-semibold text-center mb-4 text-slate-600">
        GitHub User Card
      </h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex items-center">
          <input
            type="text"
            className="border rounded-l p-2 flex-grow focus:outline-none"
            placeholder="Enter GitHub Username"
            value={username}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="bg-slate-500 text-white p-2 rounded-r hover:bg-slate-700 focus:outline-none"
          >
            Search
          </button>
        </div>
      </form>
      {userData && (
        <div>
          <div className="text-center">
            <div className="relative mx-4 mt-4  h-80   overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
        {userData && (
          <img
            src={userData.avatar_url}
            alt={`${userData.login}'s Avatar`}
            className="w-full h-full object-cover"
          />
        )}
      </div>
          </div>
          <h2 className="text-2xl font-semibold text-center mt-4">
            {userData.login}
          </h2>
          {userData.name && (
            <p className="text-center text-gray-600 text-sm">
              {userData.name}
            </p>
          )}
          <ul className="list-disc pl-8 mt-4">
            <li className="mb-2 text-lg">Public Repositories: {userData.public_repos}</li>
            <li className="mb-2 text-lg">Public Gists: {userData.public_gists}</li>
            <li className="mb-2 text-lg">
              Profile Created At:{" "}
              {new Date(userData.created_at).toLocaleDateString()}
            </li> 
          </ul>
        </div>
      )}
    </div>
  );
};

export default GitHubCard;
