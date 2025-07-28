import React from 'react'
import "../../css/Navbar.css";
import logo from "../../../public/assets/samyog_logo_text_white.png"
import {Link} from 'react-router-dom'
const Navbar = () => {
  return (
    <div id='Navbar_container'>
       
        <ul id="options">
            <li className="option"> <Link to='/' className='textl'>Home</Link> </li>
            <li className="option"> <Link to='/' className='textl'>About</Link> </li>
            <li className="option"> <Link to='/' className='textl'>Events</Link> </li>
            {/* <li className="option option4">Bra</li> */}
        </ul>
        <img src={logo} alt="logo" id='nav_logo' />


      
    </div>
  )
}

export default Navbar
