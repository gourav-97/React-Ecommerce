import React, {Component} from 'react';
import './Navbar.css';

// Class for Navbar
class Navbar extends Component {

    render() {
        return (
            <div className="navbar">
                <div className="header">
                    <img className="logo" src="http://press.traveloka.com/wp-content/uploads/2015/08/Traveloka_Secondary_Logo.png" alt="logo" width="150" />
                    <span className="purpose">Payments</span>
                </div>
            </div>
        )
    }
}

export default Navbar;