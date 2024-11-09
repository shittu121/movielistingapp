"use client";
import React, { useEffect, useState } from 'react';

const TMDB_API_KEY = "7f5cf3c0e7cd34dcbe6b78bce17faef4";

interface Movie {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    poster_path: string | null;
    videos?: {
        results: { key: string; site: string; type: string }[];
    };
}

interface MovieDetailsProps {
    params: {
        id: string;
    };
}

async function getMovie(id: string): Promise<Movie> {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&append_to_response=videos`
    );

    if (!res.ok) throw new Error("Failed to fetch movie data");
    return res.json();
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ params }) => {
    const [movie, setMovie] = useState<Movie | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchMovie() {
            try {
                const movieData = await getMovie(params.id);
                setMovie(movieData);
            } catch (err) {
                setError((err as Error).message);
            }
        }

        fetchMovie();
    }, [params.id]);

    if (error) return <p className="text-red-500 text-center">{error}</p>;
    if (!movie) return <p className="text-center">Loading...</p>;

    // Find the first trailer video from YouTube in the TMDB videos array
    const trailer = movie.videos?.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-gray-900 text-white rounded-lg  p-6 lg:flex lg:gap-10">
                {/* Movie Poster */}
                {movie.poster_path && (
                    <div className="lg:w-1/3 mb-6 lg:mb-0 flex justify-center">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={`${movie.title} poster`}
                            className="rounded-lg shadow-lg max-h-96"
                        />
                    </div>
                )}

                {/* Movie Details */}
                <div className="lg:w-2/3 space-y-4">
                    <h1 className="text-3xl font-bold text-blue-400">{movie.title}</h1>
                    <p className="text-gray-300 italic">Release Date: {movie.release_date}</p>
                    <p className="text-gray-200">{movie.overview}</p>

                    {/* Trailer */}
                    {trailer && (
                        <div className="mt-6">
                            <h2 className="text-xl font-semibold mb-2 text-blue-400">Watch Trailer</h2>
                            <div className="aspect-w-16 ">
                                <iframe
                                    src={`https://www.youtube.com/embed/${trailer.key}`}
                                    title="Movie Trailer"
                                    className="w-full  rounded-lg shadow-lg"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
