
import Link from 'next/link';
import React from 'react'
// import Image from 'next/image'

// import MovieData from '../../data/movielist'
async function getMovies() {
    const res = await fetch('  http://localhost:4000/movielist')
    return res.json()
}
export default async function MoviesList() {
    const movies = await getMovies();
    return (
        <div className='grid md:grid-cols-4 md:gap-10 gap-5 '>
            {movies.map((movie: { id: React.Key | null | undefined; ratings: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }) => (
                <div key={movie.id} >
                    <Link href={`/movies/${movie.id}`} >
                        <div className='p-3 bg-slate-700 rounded-xl md:mb-10 mb-5 relative '>
                            <div className='absolute left-6 top-6 px-4 bg-black opacity-80 rounded-md text-amber-400'>{movie.ratings}</div>
                            {/* <Image src={movie.pic} height={700} width={400} className='w-full' alt='' /> */}
                            <div className='mt-3'>
                                <span>
                                    {movie.title}
                                </span>
                            </div>

                        </div>
                    </Link>
                </div>
            ))}

        </div>
    )
}
