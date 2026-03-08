import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className=' navbar h-18 bg-purple-500 flex justify-between px-3 items-center text-white text-xl'>
        <div className='logo font-bold text-lg'>
            <Link href ='/'><li>BitLinks</li></Link>
        </div>
        <ul className='flex justify-center  gap-5  items-center'>
            <Link href ='/'><li>Home</li></Link>
            <Link href ='/about'><li>About</li></Link>
            <Link href ='/contact'><li>Contact</li></Link>
            <Link href ='/Shorten'><li>Shorten</li></Link>
            <li className='flex gap-3'>
                <Link href ="/Shorten"><button className='bg-purple-900 rounded-lg shadow-lg p-3 py-2 font-bold'>Try Now</button></Link>
                <Link href ="/github"><button className='bg-purple-900 rounded-lg shadow-lg p-3 py-2 font-bold'>Github</button></Link>

            </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
