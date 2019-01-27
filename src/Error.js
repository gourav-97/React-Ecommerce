import React, { Component } from 'react';
import './Error.css';

class Error extends Component {

    render() {
        return (
            <div className="error-page">
                <center><img alt="oops-msg" src="http://skweal-business.cloudapp.net/Content/images/big_oops.png" width="300" /></center>
                <h2>It seems you somehow landed on error page...</h2> <br />
            </div>
        )
    }
}

export default Error;