import React from 'react'
import { Link } from 'react-router-dom';

export const Navbar = () => {

  return (
    <nav className='navbar'>
        <h1>Her<span>tsi</span></h1>
        <div className="links">
        <div className="content">
        <Link to={"/"} className='nav-link'>Home</Link>
        <Link to={"/order"} className='nav-link'>Order</Link>
      </div>
        </div>


    </nav>
  )
}