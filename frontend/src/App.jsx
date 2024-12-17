import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './NavBar'
import SearchBar from './SearchBar'
import websiteLogo from '/src/assets/Swapify-logo.png'
import Carousel from './Carousel'

function App() {
  const [count, setCount] = useState(0)

  const images = [
    "https://via.placeholder.com/1200x500/FF0000/FFFFFF?text=Image+1",
    "https://via.placeholder.com/1200x500/00FF00/FFFFFF?text=Image+2",
    "https://via.placeholder.com/1200x500/0000FF/FFFFFF?text=Image+3",
    "https://via.placeholder.com/1200x500/FFFF00/FFFFFF?text=Image+4",
    "https://via.placeholder.com/1200x500/FF00FF/FFFFFF?text=Image+5",
  ];

  return (
    <div className='relative h-screen w-screen bg-black -z-50'>
    <div className='absolute top-7 flex flex-row justify-between w-screen pl-7 pr-7'>
      <div 
      className='text-white flex flex-row items-center text-2xl'>
      <img 
        className='h-12 m-1'
        src={websiteLogo}
        alt="website-logo"
      />Swapify</div>
      {/* <div
        className=' w-96'>
        <SearchBar />

        </div> */}

        <div className='w-[500px] shadow-xl rounded-full'>
          <NavBar />
        </div>
    </div>
    <div>
      <Carousel images={images} height="500px" />
    </div>
    </div>
      
  )
}

export default App
