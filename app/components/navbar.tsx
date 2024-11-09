import React from 'react'
import Image from 'next/image'
import Logo from "@/public/images/icon.png"
import Link from 'next/link'
export default function Navbar() {
    return (
        <header className='md:px-10 px-4 py-2'>
            <div className='md:grid flex md:grid-cols-2 gap-10 items-center  md:justify-center'>
                <div>
                    <Link href="/home">
                        <Image src={Logo} alt='' />
                    </Link>
                </div>
                <div className='flex items-end justify-end text-sm gap-5'>
                    <div>
                        <Link href="/movies">Movies</Link>
                    </div>
                    <div>
                        <Link href="/tv-shows">Tv Shows</Link>
                    </div>
                    

                </div>
            </div>
        </header>
    )
}
