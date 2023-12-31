import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import '../globals.css'

import Navbar from '../components/navbar'


const inter = Poppins({
    subsets: ['latin'],
    weight: '100'
})

export const metadata: Metadata = {
    title: 'Movies',
    description: '',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className= {inter.className}    >
               <Navbar />
                {children}
            </body>
        </html>
    )
}
