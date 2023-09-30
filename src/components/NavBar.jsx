import React, { useContext } from 'react'
import Logo from '../img/logo.png'
import {Link} from 'react-router-dom'
const NavBar = () => {


  return (
    <div className='navbar'>
      <div className="container">
        <div className="logo">
          <Link className='link' to="/">
            <h1>Scandiweb Test Assignment</h1>
          </Link>
        </div>
        
      </div>
      
    </div>
  )
}

export default NavBar