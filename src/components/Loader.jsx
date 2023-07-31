import React from 'react'
import '../App.css'
function Loader() {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  )
}

export default Loader