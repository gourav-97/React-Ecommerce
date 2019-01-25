import React from 'react';
import {Link} from 'react-router-dom';
const Header=()=>{
    return(
        <div>
        <nav className="nav-wrapper blue darken-3">
            <div className="container">
                {/* <ul className="left"> */}
                <a href="/" className="brand-logo"><i className="material-icons">store</i>Ecommerce</a>
                <ul className="right">
                    <li><Link to ="/"> Category</Link> </li>
                    <li><Link to ="#"> My Orders</Link> </li>
                    <li><Link to ="#"> My Cart</Link> </li>
                </ul>
            </div>
        </nav>       
        </div>
    )
}
export default Header;