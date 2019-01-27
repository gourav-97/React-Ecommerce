import React, { Component } from 'react';
import axios from 'axios';
import './PaymentSuccess.css';
import Navbar from './Navbar';
import * as constant from './constant';

// Class to show the status of Payment
class PaymentSuccess extends Component {

    // State Variable to store either a success or failure msg
    state = {
        success_msg: "",
        error_msg: ""
    }

    componentDidMount = () => {

        // Post request with orderId at /payment/pay
        axios.post(constant.ms3+'/payment/pay', {
            "orderId": this.props.location.state.orderId
        }).then((response) => {
            if(response.data.statusCode === 200) {     //   Display response if status code is 200
                this.setState({
                    success_msg: "Payment Successful!",
                    error_msg: ""
                })
            } else {        //  Display error if status is 400 / 404 / 405 / 500
                this.setState({
                    success_msg: "",
                    error_msg: "Payment Failed!"
                })
            }
        }).catch((error) => {   // Catch the error if didn't get the response
            console.log(error);
        });
    }

    render() {
        return(
            <div className="display-response"> 
                <Navbar /> 
                <center><div className="success-bar">{this.state.success_msg}</div></center>
                <center><div className="error-bar">{this.state.error_msg}</div></center>            
            </div>
        )
    }
}

export default PaymentSuccess;