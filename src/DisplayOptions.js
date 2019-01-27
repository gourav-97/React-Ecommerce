import React, { Component } from 'react';
import './PaymentOption.css';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import './DisplayOptions.css'
import * as constant from './constant'
// Class to choose a payment option and send the data by post request
class DisplayOptions extends Component {

    // State variables
    state = {
        payment_option: "",
        orderId: "",
        error_msg: ""
    }

    // Funtion to save the payment option in state variable
    handleChange = (event) => {

        this.setState({
            payment_option: event.target.value,
            orderId: this.props.orderId
        });
    }

    // Function to send a post request with the selected payment option
    handleSubmit = (event) => {
        event.preventDefault();
        axios.post(constant.ms3+'/payment', {     //   axios call to send a post request to API with selected payment option
            'orderId': this.state.orderId,
            'optionSelected': this.state.payment_option
            
        }).then((response) => {

            // Sending the data and control to the respective payment option endpoint
            if(response.data.statusCode === 200) {
                this.props.history.push({       // Redirect to specific payment route if status code is 200
                    pathname: "/payment/"+this.state.payment_option,
                    state: { 
                        'orderId': response.data.responseData.orderId 
                    }
                }); 
            } else {        //  else displayed error msg
                this.setState({
                    error_msg: response.data.message
                })
            }
            
        }).catch((error) => {

            // Display the error if occurs while sending the post request
            console.log(error);
        });
    }


    render() {

        // Display all the available options to the user using map
        const {paymentOptions} = this.props;
        const optionList = paymentOptions.map(options => {
            return (
                <div>
                    <div className="jumbotron">
                        {/* Displaying a radio button with each payment option */}
                        {/* <input type="radio" name="paymentOptionOpt" value={options} onClick={this.handleClick} onChange={this.handleChange} required /> {options}  */}
                        <p>
                            <label>
                                <input name="paymentOptionOpt" type="radio" value={options} onChange={this.handleChange} /><span>{options}</span>
                            </label>
                        </p>
                    </div>
                </div>
            )
        })

        return (
            <div className="paymentOptions">
                <div className="error-bar"></div>
                <h2>Choose your payment option</h2>
                <div className="options">
                    {/* <form onSubmit={this.handleSubmit}>
                        {optionList}
                        <button>Next</button>
                    </form> */}

                    <form onSubmit={this.handleSubmit}>
                            {optionList}
                        <button className="waves-effect waves-light btn-small">Next</button>
                    </form>

                    <img className="paymentModeImg" alt="Payment Mode Img" src="https://www.bharatbillpay.com/bbps-side/bbpsadmin/kcfinder/upload/images/1480567885_customer_mode.png" />
                </div>
            </div>
        );
    }
}

export default withRouter(DisplayOptions);