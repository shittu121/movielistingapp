
import Image from 'next/image'
import loginImg from '@/public/images/Frame 83.png'

export default function page() {
  return (
    <main className='md:h-screen flex justify-center items-center p-4 '>
    <div className='grid md:grid-cols-2 gap-10 items-center justify-center'>
      <div className='relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/2 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]'>
        <Image src={loginImg} width={450} height={450} alt='' />
      </div>

      <div className=' flex flex-col text-sm  gap-5 ' >
        <div className=''>
          <h2 className='text-3xl'>Login</h2>
        </div>
        <div>
          <input type="text" placeholder='Email' className='h-12 bg-transparent outline-none indent-2 border border-gray-500 rounded-xl w-full' name="" id="" />
        </div>
         <div>
          <input type="text" placeholder='Password' className='h-12 bg-transparent outline-none indent-2 border border-gray-500 rounded-xl w-full' name="" id="" />
        </div>
        <div>
         <a href="/home">
         <button className='bg-[#7B6EF6] w-full py-3 rounded-xl'>Login</button>
         </a>
        </div>

      </div>
    </div>
  </main>
  )
}

// Project name - movie-list
// Project ID - movie-list-adc78
// Project number -697649131765