import React, { Suspense } from 'react';
import MoviesList from '../components/movies';
import Search from '../components/Search';

export default function page() {
    return (
        <main className='md:px-16 px-4 mt-10'>
            <div className='mb-10'>
                <div className='grid grid-cols-2 mb-6'>
                    <div>
                        <span className='text-xs text-[#8E95A9]' >MaileHereko</span>
                        <h2 className='text-5xl font-bold'>Movies</h2>
                    </div>
                    <div className='relative md:flex hidden place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/2 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]'>

                    </div>
                </div>

                <div className='flex'>
                    <Search />
                </div>
            </div>

            {/* Wrap MoviesList in Suspense */}
            <Suspense fallback={<div>Loading movies...</div>}>
                <MoviesList />
            </Suspense>

        </main>
    );
}
