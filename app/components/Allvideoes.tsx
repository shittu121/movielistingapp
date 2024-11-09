"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Movie and TV show list component with pagination
export default function AllVideosList() {
  const [movielist, setMovielist] = useState<any[]>([]);  // Combined movie and tv data
  const [currentPage, setCurrentPage] = useState(1);       // Current page
  const [totalPages, setTotalPages] = useState(0);         // Total pages
  const [totalResults, setTotalResults] = useState(0);     // Total number of results
  const [loading, setLoading] = useState(true);            // Loading state

  // Fetch movie and TV show data based on page
  const getMoviesAndTV = (page: number) => {
    setLoading(true);

    // Fetch Movies
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=1cf389e0f40ef3e4cb2868cb714afb09&page=${page}`
    )
      .then((res) => res.json())
      .then((movieData) => {
        // Fetch TV Shows
        fetch(
          `https://api.themoviedb.org/3/discover/tv?api_key=1cf389e0f40ef3e4cb2868cb714afb09&page=${page}`
        )
          .then((res) => res.json())
          .then((tvData) => {
            // Combine both movie and tv data into one list
            const combinedData = [...movieData.results, ...tvData.results];
            setMovielist(combinedData);
            setTotalPages(Math.max(movieData.total_pages, tvData.total_pages)); // Use the max pages from both data
            setTotalResults(movieData.total_results + tvData.total_results); // Sum the total number of results
            setLoading(false);
          });
      });
  };

  // Check if there is a saved page in localStorage on component mount
  useEffect(() => {
    const savedPage = localStorage.getItem("currentPage");
    if (savedPage) {
      setCurrentPage(Number(savedPage));  // Set the page from localStorage
    }
  }, []);

  // Fetch movies and tv shows based on the current page
  useEffect(() => {
    getMoviesAndTV(currentPage);  // Fetch movies and tv shows for the current page
    // Save the current page to localStorage whenever it changes
    localStorage.setItem("currentPage", String(currentPage));
  }, [currentPage]);

  // Function to handle page changes
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;  // Prevent invalid pages
    setCurrentPage(page);
  };

  return (
    <div className="p-5">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
            <div className='mb-8'>
                <span className='text-3xl text-[#8E95A9]'>
                    All <sub className='text-xs'>({totalResults})</sub>
                </span>
            </div>
          <div className="grid md:grid-cols-4 md:gap-10 gap-5">
            {movielist.map((item) => (
              <div key={item.id} className="p-3 bg-slate-700 rounded-xl md:mb-10 mb-5 relative">
                <Link href={`/movies/${item.id}`}>
                  <Image
                    src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                    height={700}
                    width={400}
                    className="w-full rounded-md"
                    alt={item.title || item.name}
                  />
                </Link>
                <div className="absolute left-6 top-6 px-4 bg-black opacity-80 rounded-md text-amber-400">
                  {item.vote_average}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination controls */}
          <div className="flex justify-center mt-6">
            <button
              className="px-4 py-2 border border-gray-500 rounded-lg mr-2"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {/* Page numbers */}
            <span className="px-4 py-2">{currentPage} / {totalResults}</span>
            <button
              className="px-4 py-2 border border-gray-500 rounded-lg ml-2"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
