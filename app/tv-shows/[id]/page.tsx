"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

// Movie/TV Show details component with dynamic route parameter
export default function VideoDetails({ params }: { params: Promise<{ id: string }> }) {
  const [video, setVideo] = useState<any>(null);  // State to hold movie or TV show details
  const [videos, setVideos] = useState<any[]>([]); // State to hold videos for movie/TV show
  const [isMovie, setIsMovie] = useState<boolean | null>(null); // Flag to differentiate between movie and TV show
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [videoId, setVideoId] = useState<string | null>(null); // Video ID

  useEffect(() => {
    // Unwrap params to get the video ID
    const fetchParams = async () => {
      try {
        const resolvedParams = await params;
        setVideoId(resolvedParams.id); // Set the video ID
      } catch (err) {
        console.error("Error resolving params:", err);
        setError("Failed to load parameters");
      }
    };

    fetchParams();
  }, [params]); // Only run once the params are resolved

  // Fetch video (movie or TV show) details
  const getVideoDetails = async (id: string, isMovie: boolean) => {
    const endpoint = isMovie
      ? `https://api.themoviedb.org/3/movie/${id}?api_key=1cf389e0f40ef3e4cb2868cb714afb09`
      : `https://api.themoviedb.org/3/tv/${id}?api_key=1cf389e0f40ef3e4cb2868cb714afb09`;

    try {
      const res = await fetch(endpoint);
      const data = await res.json();
      console.log("Fetched video details:", data); // Debugging log
      setVideo(data);
    } catch (error) {
      console.error("Error fetching video details:", error);
      setError("Failed to fetch video details");
    }
  };

  // Fetch videos (movie or TV show videos)
  const getVideoVideos = async (id: string, isMovie: boolean) => {
    const endpoint = isMovie
      ? `https://api.themoviedb.org/3/movie/${id}/videos?api_key=1cf389e0f40ef3e4cb2868cb714afb09`
      : `https://api.themoviedb.org/3/tv/${id}/videos?api_key=1cf389e0f40ef3e4cb2868cb714afb09`;

    try {
      const res = await fetch(endpoint);
      const data = await res.json();
      console.log("Fetched videos:", data); // Debugging log for video response
      if (data.results && data.results.length > 0) {
        setVideos(data.results);
      } else {
        setError("No videos available for this title.");
      }
    } catch (error) {
      console.error("Error fetching video videos:", error);
      setError("Failed to fetch video videos");
    }
  };

  // Check if the videoId is for a movie or TV show
  const checkIfMovieOrTV = async () => {
    if (!videoId) return;

    setIsLoading(true); // Start loading when checking if it's a movie or TV show

    try {
      // Try fetching the movie details first
      const movieRes = await fetch(
        `https://api.themoviedb.org/3/movie/${videoId}?api_key=1cf389e0f40ef3e4cb2868cb714afb09`
      );
      const movieData = await movieRes.json();

      if (movieData.id) {
        setIsMovie(true);
        getVideoDetails(videoId, true);
        getVideoVideos(videoId, true);
        return;
      }

      // If it's not a movie, try fetching TV show details
      const tvRes = await fetch(
        `https://api.themoviedb.org/3/tv/${videoId}?api_key=1cf389e0f40ef3e4cb2868cb714afb09`
      );
      const tvData = await tvRes.json();

      if (tvData.id) {
        setIsMovie(false);
        getVideoDetails(videoId, false);
        getVideoVideos(videoId, false);
      } else {
        setError("Unable to find the movie or TV show.");
      }
    } catch (error) {
      console.error("Error determining if movie or TV show:", error);
      setError("Failed to determine if it's a movie or TV show");
    } finally {
      setIsLoading(false); // Stop loading once the check is done
    }
  };

  useEffect(() => {
    if (videoId) {
      checkIfMovieOrTV(); // Determine if the content is a movie or TV show
    }
  }, [videoId]); // Re-run when videoId is set

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;

  if (!video) return <p>Video not found.</p>;

  // If there are no videos available, show a fallback image or message
  if (videos.length === 0) {
    return (
      <div className="video-details-page p-10">
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
              <strong>{isMovie ? "Release Date" : "First Air Date"}:</strong>{" "}
              {isMovie ? video.release_date : video.first_air_date}
            </p>
            <p>
              <strong>Rating:</strong> {video.vote_average}
            </p>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl mb-4">No Trailer Available</h2>
          <p>Unfortunately, there are no videos available for this title at the moment.</p>
        </div>
      </div>
    );
  }

  // Select the first video (or any specific type of video like "Trailer")
  const selectedVideo = videos.find((video) => video.type === "Trailer") || videos[0];

  return (
    <div className="video-details-page p-10">
      <h1 className="text-4xl mb-6">{video.title || video.name}</h1>
      <div className="flex gap-10">
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
            <strong>{isMovie ? "Release Date" : "First Air Date"}:</strong>{" "}
            {isMovie ? video.release_date : video.first_air_date}
          </p>
          <p>
            <strong>Rating:</strong> {video.vote_average}
          </p>
        </div>
      </div>

      {/* Display the selected video */}
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
    </div>
  );
}
