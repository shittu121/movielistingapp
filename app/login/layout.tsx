import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'

import Image from 'next/image'
import Logo from "@/public/images/icon.png"


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Login',
    description: 'Login to Getstarted',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className= {inter.className}    >
                <header className='px-10 py-2'>
                    <div className='grid md:grid-cols-2 gap-10 items-center  justify-center'>
                        <div>
                            <Image src={Logo} alt='' />
                        </div>
                        <div className='flex items-end justify-end text-sm gap-5'>
                            <div>
                                <a href="">Privacy policy</a>
                            </div>
                            <div>
                                <a href="">Translate</a>
                            </div>
                         


                        </div>
                    </div>
                </header>
                {children}
            </body>
        </html>
    )
}
