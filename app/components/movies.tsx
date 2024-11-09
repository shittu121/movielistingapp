"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Movie list component with pagination
export default function MoviesList() {
  const [movielist, setMovielist] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);  // Current page
  const [totalPages, setTotalPages] = useState(0);    // Total pages
  const [loading, setLoading] = useState(true);       // Loading state

  // Fetch movie data based on page
  const getMovie = (page: number) => {
    setLoading(true);
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=1cf389e0f40ef3e4cb2868cb714afb09&page=${page}`
    )
      .then((res) => res.json())
      .then((json) => {
        setMovielist(json.results);
        setTotalPages(json.total_pages);  // Set total pages for pagination
        setLoading(false);
      });
  };

  // Check if there is a saved page in localStorage on component mount
  useEffect(() => {
    const savedPage = localStorage.getItem("currentPage");
    if (savedPage) {
      setCurrentPage(Number(savedPage));  // Set the page from localStorage
    }
  }, []);

  // Fetch movies based on the current page
  useEffect(() => {
    getMovie(currentPage);  // Fetch movies for the current page
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
        <p>Loading movies...</p>
      ) : (
        <>
            <div className='mb-8'>
                <span className='text-3xl text-[#8E95A9]'>
                    All<sub className='text-xs'>({totalPages})</sub>
                </span>
            </div>
          <div className="grid md:grid-cols-4 md:gap-10 gap-5">
            {movielist.map((movie) => (
              <div key={movie.id} className="p-3 bg-slate-700 rounded-xl md:mb-10 mb-5 relative">
                <Link href={`/movies/${movie.id}`}>
                  <Image
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    height={700}
                    width={400}
                    className="w-full rounded-md"
                    alt={movie.title}
                  />
                </Link>
                <div className="absolute left-6 top-6 px-4 bg-black opacity-80 rounded-md text-amber-400">
                  {movie.vote_average}
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
            <span className="px-4 py-2">{currentPage} / {totalPages}</span>
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
