"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams, useParams } from "next/navigation";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY; // Fetching the API key from .env


export default function VideoDetails() {
  const [video, setVideo] = useState<any>(null); // State to hold movie or TV show details
  const [videos, setVideos] = useState<any[]>([]); // State to hold video results (e.g., trailers)
  const [loading, setLoading] = useState<boolean>(true); // To track loading state
  const [mediaType, setMediaType] = useState<string | null>(null); // State to hold media type
  const searchParams = useSearchParams(); // Get query params (to fetch media type)
  const params = useParams(); // Get params from URL

  useEffect(() => {
    const fetchParams = async () => {
      if (params && params.id) {
        // Safely handle string or array for id
        const id: string = Array.isArray(params.id) ? params.id[0] : params.id;

        const type = searchParams.get("type");
        if (id && type) {
          setMediaType(type); // Set the media type state
          const isMovie = type === "movie";
          const isTVShow = type === "tv";

          // Fetch details if it's either a movie or a TV show
          if (isMovie || isTVShow) {
            await fetchVideoDetails(id, isMovie);
            await fetchVideoVideos(id, isMovie);
          } else {
            setLoading(false); // No need to load further if not supported
          }
        } else {
          setLoading(false); // If id or type is missing, stop loading
        }
      } else {
        setLoading(false); // If params are missing, stop loading
      }
    };
    fetchParams();
  }, [params, searchParams]);

  // Fetch video details (movie or TV show)
  const fetchVideoDetails = async (id: string, isMovie: boolean) => {
    const endpoint = isMovie
      ? `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
      : `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`;

    try {
      const res = await fetch(endpoint);
      const data = await res.json();
      setVideo(data);
      setLoading(false); // Stop loading after data is fetched
    } catch (error) {
      console.error("Error fetching video details:", error);
      setLoading(false); // Stop loading in case of error
    }
  };

  // Fetch videos (trailers, clips, etc.)
  const fetchVideoVideos = async (id: string, isMovie: boolean) => {
    const endpoint = isMovie
      ? `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
      : `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${API_KEY}`;

    try {
      const res = await fetch(endpoint);
      const data = await res.json();
      setVideos(data.results);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  // Show "Coming Soon" for unsupported media types
  if (mediaType !== "movie" && mediaType !== "tv") {
    return <p>Coming Soon</p>;
  }

  if (!video) return <p>No video details found.</p>;

  // Select the first video (or any specific type of video like "Trailer")
  const selectedVideo = videos.find((video) => video.type === "Trailer") || videos[0];

  return (
    <div className="movie-details-page p-10">
      <h1 className="text-4xl mb-6">{video.title || video.name}</h1>
      <div className="lg:flex md:flex block space-y-5 gap-10">
        <Image
          src={`https://image.tmdb.org/t/p/w500/${video.poster_path}`}
          height={700}
          width={400}
          className="rounded-md"
          alt={video.title || video.name}
        />
        <div>
          <h2 className="text-2xl mb-4">Overview</h2>
          <p className="mb-6">{video.overview}</p>
          <p>
            <strong>{mediaType === "movie" ? "Release Date" : "First Air Date"}:</strong>{" "}
            {mediaType === "movie" ? video.release_date : video.first_air_date}
          </p>
          <p>
            <strong>Rating:</strong> {video.vote_average}
          </p>
        </div>
      </div>

      {/* Display the selected video */}
      {selectedVideo && (
        <div className="mt-10">
          <h2 className="text-2xl mb-4">Featured Video</h2>
          <div className="video-item">
            <iframe
              width="100%"
              height="500"
              src={`https://www.youtube.com/embed/${selectedVideo.key}`}
              title={selectedVideo.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <p className="mt-2">{selectedVideo.name}</p>
          </div>
        </div>
      )}
    </div>
  );
}
