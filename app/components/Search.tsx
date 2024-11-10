"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Use router for navigation

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY; // Fetching the API key from .env


const Search = () => {
  const [query, setQuery] = useState(""); // Track search query
  const [results, setResults] = useState<any[]>([]); // Track search results
  const router = useRouter();

  // Handle search query change
  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setQuery(searchValue);

    // If query is empty or less than 3 characters, clear results
    if (searchValue.length === 0) {
      setResults([]);
      return;
    }

    // Fetch results if query length is more than 2
    if (searchValue.length > 2) {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${searchValue}`
      );
      const data = await res.json();

      // Check if results are found, otherwise show no results message
      if (data.results && data.results.length > 0) {
        setResults(data.results);
      } else {
        setResults([]); // No results found
      }
    } else {
      setResults([]); // Clear results if query is too short
    }
  };

  // Navigate to the details page when a search result is clicked
  const handleResultClick = (id: number, mediaType: string) => {
    router.push(`/search-details/${id}?type=${mediaType}`); // Navigate to the details page using ID and media type
  };

  return (
    <div>
      <form className="w-full">
        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path stroke="currentColor" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input
            type="search"
            value={query}
            onChange={handleSearch} // Call handleSearch on input change
            id="default-search"
            className="block w-full p-4 ps-10 text-xs text-gray-900 border border-gray-500 outline-none rounded-lg bg-transparent focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Movies or TV Shows..."
            required
          />
        </div>
      </form>

      {/* Display no results message if no results found */}
      {query.length > 2 && results.length === 0 && <p>No results found</p>}

      {/* Display search results */}
      {results.length > 0 && (
        <ul className="mt-4">
          {results.map((result: any) => (
            <li
              key={result.id}
              className="cursor-pointer p-2 border-b border-gray-500"
              onClick={() => handleResultClick(result.id, result.media_type)}
            >
              {result.title || result.name} ({result.media_type === "movie" ? "Movie" : "TV Show"})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
