
async function getMovie(id) {
    const res = await fetch('https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=bojack&country=uk' + id, {
        next: {
            revalidate: 60,
        }
    })

    return res.json()
}
export default async function MoviesDetails({ params }) {
    const movie = await getMovie(params.id);
    return (
        <div><span>{movie.title}
           </span></div>
    )
}
