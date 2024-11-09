"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// TV Show list component with pagination
export default function TVShowList() {
  const [tvShowList, setTvShowList] = useState<any[]>([]); // State for storing TV shows
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(0); // Total pages
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch TV show data based on page
  const getTVShows = (page: number) => {
    setLoading(true);
    fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=1cf389e0f40ef3e4cb2868cb714afb09&page=${page}`
    )
      .then((res) => res.json())
      .then((json) => {
        setTvShowList(json.results); // Set TV shows data
        setTotalPages(json.total_pages); // Set total pages for pagination
        setLoading(false);
      });
  };

  // Check if there is a saved page in localStorage on component mount
  useEffect(() => {
    // Check if totalPages is available
    if (totalPages > 0) {
      const savedPage = localStorage.getItem("currentPage");
      if (savedPage) {
        const page = Number(savedPage);
        // Validate the saved page number, ensuring it's within the valid range
        if (page >= 1 && page <= totalPages) {
          setCurrentPage(page); // Set the page from localStorage
        } else {
          setCurrentPage(1); // Fallback to page 1 if the saved page is invalid
        }
      }
    }
  }, [totalPages]); // Only check localStorage once totalPages is available

  // Fetch TV shows based on the current page
  useEffect(() => {
    getTVShows(currentPage); // Fetch TV shows for the current page
  }, [currentPage]); // Fetch data whenever the current page changes

  // Save the current page to localStorage whenever it changes
  useEffect(() => {
    if (totalPages > 0) {
      localStorage.setItem("currentPage", String(currentPage));
    }
  }, [currentPage, totalPages]); // Save the page when it changes

  // Function to handle page changes
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return; // Prevent invalid pages
    setCurrentPage(page);
  };

  return (
    <div className="">
      {loading ? (
        <p>Loading TV shows...</p>
      ) : (
        <>
          <div className="mb-8">
            <span className="text-3xl text-[#8E95A9]">
              All TV Shows<sub className="text-xs">({totalPages})</sub>
            </span>
          </div>
          <div className="grid md:grid-cols-4 md:gap-10 gap-5">
            {tvShowList.map((tvShow) => (
              <div
                key={tvShow.id}
                className="p-3 bg-slate-700 rounded-xl md:mb-10 mb-5 relative"
              >
                <Link href={`/tv-shows/${tvShow.id}`}>
                  <Image
                    src={`https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`}
                    height={700}
                    width={400}
                    className="w-full rounded-md"
                    alt={tvShow.name} // Use 'name' for TV shows
                  />
                </Link>
                <div className="absolute left-6 top-6 px-4 bg-black opacity-80 rounded-md text-amber-400">
                  {tvShow.vote_average}
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
            <span className="px-4 py-2">
              {currentPage} / {totalPages}
            </span>
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
