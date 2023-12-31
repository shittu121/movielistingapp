import React from 'react'
import Image from 'next/image'
import Logo from "@/public/images/icon.png"
export default function Navbar() {
    return (
        <header className='px-10 py-2'>
            <div className='grid md:grid-cols-2 gap-10 items-center  justify-center'>
                <div>
                   <a href="/home">
                   <Image src={Logo} alt='' />
                   </a>
                </div>
                <div className='flex items-end justify-end text-sm gap-5'>
                    <div>
                        <a href="/movies">Movies</a>
                    </div>
                    <div>
                        <a href="/tv-shows">Tv Shows</a>
                    </div>
                    <div>
                        <a href="">Suggest me </a>
                    </div>


                </div>
            </div>
        </header>
    )
}
