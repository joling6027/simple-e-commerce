import React from 'react'
import { CartIcon, LogoIcon } from './icons';
import Link from 'next/link';

const NavBar = () => {
  return (
    <>
      <div className='flex bg-cyan-400 px-5 pt-5 justify-between'>
        <Link href={'/'} >
          <div className='flex gap-2 mb-4'>
            <div><LogoIcon /></div>
            <div>
              <h1 className='font-bold text-xl'>BestChoice</h1>
            </div>
          </div>
        </Link>
        <Link href={'/checkout'} className='h-7 w-7'>
          <CartIcon />
        </Link>
      </div>
    </>
  )
}

export default NavBar;