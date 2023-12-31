import React from 'react'

import MoviesList from '../components/movies'
export default function page() {
    return (
        <main className='md:px-16 px-4 mt-10'>
            <div className='mb-10'>
                <div className='grid grid-cols-2 mb-6'>
                    <div>
                        <span className='text-xs text-[#8E95A9]' >MaileHereko</span>
                        <h2 className='text-5xl font-bold'>Tv Shows</h2>
                    </div>
                    <div className='relative md:flex hidden place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/2 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]'>

                    </div>
                </div>

                <div className='flex'>
                    <form>
                        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="search" id="default-search" className="block w-full p-4 ps-10 text-xs text-gray-900 border border-gray-500 outline-none rounded-lg bg-transparent focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Movies ..." required />

                        </div>
                    </form>
                </div>
            </div>

            <div className='mb-8'>
                <span className='text-sm text-[#8E95A9]'>
                    120 items
                </span>
            </div>

            <MoviesList />

        </main>
    )
}
