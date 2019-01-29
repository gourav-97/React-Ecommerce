import React from 'react';
import {Link} from 'react-router-dom';
import './Header.css';
// import logo from './logo.png';
const Header=()=>{
    return(
        <div>
        <nav className="navbar-brand blue darken-3">
            <div className="container">
                <a href="/" className="brand-logo"><img src={process.env.PUBLIC_URL + '/logo.png'} width="120" alt="logo" /></a>
                <ul className="right">
                    <li><Link to ="/category"> Category</Link></li>
                    <li><Link to ="/orderHistory"> Order History</Link></li>
                    <li><Link to ="/cart"> My Cart</Link> </li>
                </ul>
            </div>
        </nav>       
        </div>
    )
}
export default Header;