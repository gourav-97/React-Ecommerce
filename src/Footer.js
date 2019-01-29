import React from 'react';
import {NavLink} from 'react-router-dom';
import './Footer.css'
const Footer=()=>{
    return(
        <div className="Footer">
        {/* <nav className="nav-wrapper blue darken-3"> */}
            <div className="container">
                <ul className="left">
                </ul>
                <ul className="right">
                    {/* <li><NavLink to = "/about">About</NavLink> </li> */}
                    {/* <li><NavLink to = "/contact">Contact</NavLink> </li> */}
                </ul>
            </div>
        {/* </nav>        */}
        </div>
    )
}
export default Footer;