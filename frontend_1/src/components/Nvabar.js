import React from 'react'
import "../css/Navbar.css";
import logo from "../assets/cube_samyog_logos_white.png"
import {Link} from 'react-router-dom'
const Navbar = () => {
  return (
    <div id='Navbar_container'>

      <Link to='/' className="nav_box_1 nav_box">
        <img src={logo} alt="logo" id='nav_logo' />
      </Link>
      <div className="nav_box_2 nav_box">
     {/* <img src={logo} alt="logo" id='nav_logo' /> */}
      </div>
      <div className="nav_box_3 nav_box">
        <ul id="options">

            <li className="option"> <Link to='/' className='textl'>Home</Link> </li>
            <li className="option"> <Link to='/aboutus' className='textl'>About</Link> </li>
            <li className="option"> <Link to='/events' className='textl'>Events</Link> </li>
            <li className="option"> <Link to='/login' className='textl'>Login</Link> </li>
            <li className="option"> <Link to='/signUp' className='textl'>Sign Up</Link> </li>

            
            {/* <li className="option option4">Bra</li> */}
        </ul>
       </div>
        
        


      
    </div>
  )
}

export default Navbar
