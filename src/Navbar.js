import React, {Component} from 'react';
import './Navbar.css';

// Class for Navbar
class Navbar extends Component {

    render() {
        return (
            <div className="navbar">
                <div className="header">
                    <img className="logo" src="./logo.png" alt="logo" width="150" />
                    <span className="purpose">Payments</span>
                </div>
            </div>
        )
    }
}

export default Navbar;