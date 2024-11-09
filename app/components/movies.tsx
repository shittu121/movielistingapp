import React from 'react';

interface MoviesListProps {
    filter: string;
}

const MoviesList: React.FC<MoviesListProps> = ({ filter }) => {
    // Fetch movies based on the filter (All, Movies, TV Shows)
    // Here you could filter movies locally or adjust your API call to fetch based on the selected filter

    return (
        <div>
            {/* Render the filtered list of movies */}
            {filter === "All" && <p>Displaying all movies and TV shows</p>}
            {filter === "Movies" && <p>Displaying only movies</p>}
            {filter === "TV Shows" && <p>Displaying only TV shows</p>}
            {/* Replace the above paragraphs with actual filtered data */}
        </div>
    );
};

export default MoviesList;
