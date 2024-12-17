import React from 'react'
import "./NavBar.css"

function NavBar() {
  return (
    <>
        <div 
        className='m-1 bg-white/70 backdrop-blur-lg rounded-full h-12 flex flex-row justify-between items-center'>
            
            <button
            className='pl-3 pr-3 pt-2 pb-2 w-18 ml-1 hover:bg-slate-900 hover:text-white  hover:rounded-full transition-nav-bar text-black font-semibold'>HOME</button>
            <button
            className='pl-3 pr-3 pt-2 pb-2 w-18  hover:bg-slate-900 hover:text-white text-black hover:rounded-full transition-nav-bar font-semibold'>BOOKS</button>
            <button
            className='pl-3 pr-3 pt-2 pb-2 w-18  hover:bg-slate-900 hover:text-white text-black hover:rounded-full transition-nav-bar font-semibold'>GADGETS</button>
            <button
            className='pl-3 pr-3 pt-2 pb-2 w-18  hover:bg-slate-900 hover:text-white text-black hover:rounded-full transition-nav-bar font-semibold'>SHOES</button>
            <button
            className='pl-3 pr-4 pt-2 pb-2 w-18  hover:bg-slate-900 hover:text-white text-black hover:rounded-full transition-nav-bar font-semibold'>OTHERS</button>
            <button
            className='pl-3 pr-3 pt-2 pb-2 w-18 mr-1 hover:bg-slate-900 hover:text-white text-black hover:rounded-full transition-nav-bar font-semibold'>LOG IN</button>
        </div>
    </>
  )
}

export default NavBar