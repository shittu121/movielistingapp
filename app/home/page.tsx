import React from 'react'
import AllVideosList from '../components/Allvideoes'
import Link from 'next/link'
import Search from '../components/Search'

const Home = () => {
  return (
    <div>
      <main className='md:px-16 px-4 mt-10'>
            <div className='mb-10'>
                <div className='grid grid-cols-2 mb-6'>
                    <h2 className='text-5xl font-bold'>MaileHereko</h2>
                    <div className='relative md:flex hidden place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/2 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]'>

                    </div>
                </div>
                <div className='mb-6'>
                    <span className='text-sm text-[#8E95A9]'>List of movies and TV Shows, I, Pramod Poudel have watched till date. Explore what I have watched and also feel free to make a suggestion. 😉</span>
                </div>
                <div className='flex'>
                    <Search />
                </div>
            </div>
            <div className='flex mb-10 bg-slate-800 rounded-md border gap-11 border-gray-500 p-2 w-[365px] text-xs' >
                <Link href="/" >
                    <div className='py-2 px-6 bg-[#7B6EF6] rounded-md '>
                        <span>All</span>

                    </div>
                </Link>
                <Link href="/movies">
                    <div className='py-2 px-6 bg-transparent rounded-md '>
                        <span>Movies</span>

                    </div>
                </Link>
                <Link href="/tv-shows">
                    <div className='py-2 px-6 bg-transparent rounded-md '>
                        <span>TV Shows</span>

                    </div>
                </Link>


            </div>

            

            <AllVideosList />

        </main>
    </div>
  )
}

export default Home
