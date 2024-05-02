import React from 'react'
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div className='not-found-text'>
    <h1>
    Not Found !
    
    </h1>

    <p className="not-found-text">
    You are looking for something that does not exist!!!
    </p>
    <button  className='not-found-text-btn' > <Link to={"/"}> Return to Home</Link></button>

    </div>
  )
}
