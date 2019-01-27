import React, { Component } from 'react';
import './Error.css';

class Error extends Component {
    state = {
        message: this.props.location.state.message
      };
     
    render() {
         return (
            <div className="error-page">
                <center><img alt="oops-msg" src="http://skweal-business.cloudapp.net/Content/images/big_oops.png" width="300" /></center>
                <h2>{this.state.message}</h2>
            </div>
        )
    }
}
export default Error;