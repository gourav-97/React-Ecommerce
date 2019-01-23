import React from 'react';
import {Link,NavLink,withRouter} from 'react-router-dom';

const Navbar=()=>{
    return(
        <div>
        <nav className="nav-wrapper red darken-3">
            <div className="container">
                <ul className="left">
                </ul>
                <ul className="right">
                    <li><Link to ="/category"> Category</Link> </li>
                    <li><Link to ="/products"> Products</Link> </li>
                    <li><NavLink to = "/category/about">About</NavLink> </li>
                    <li><NavLink to = "/contact">Contact</NavLink> </li>
                </ul>
            </div>
        </nav>
        </div>
        )
}
export default withRouter(Navbar);