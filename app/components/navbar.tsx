import React from 'react'
import Image from 'next/image'
import Logo from "@/public/images/icon.png"
import Link from 'next/link'
export default function Navbar() {
    return (
        <header className='px-10 py-2'>
            <div className='grid md:grid-cols-2 gap-10 items-center  justify-center'>
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
                    <div>
                        <Link href="">Suggest me </Link>
                    </div>


                </div>
            </div>
        </header>
    )
}
