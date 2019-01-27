import React, { Component } from 'react';
import axios from 'axios';
import DisplayOptions from './DisplayOptions';
import Navbar from './Navbar';
import * as constant from './constant';

// Class to display payment options by sending get request at /payment/init
class PaymentOption extends Component {

    // State variables
    state = {
        paymentOptions: [],
        orderId: "",
        error_msg: ""
    }

    // componentDidMount to receive payment options before loading the page
    componentDidMount() {
        console.log(this.props.location);
        axios.post(constant.ms3+'/checkout', {
            "orderId": this.props.location.state.orderId,
            // 'productsId': ["123"],
            // 'quantity': [1,2,3],
            // 'amount':"4000" 
        }).then((response) => {
            console.log(response)
            if(response.data.statusCode === 200) {      //  set state variable if get status code 200
                this.setState({             //  Set the state variable to call render()
                    paymentOptions: response.data.responseData.options,
                    orderId: response.data.responseData.orderId,
                    error_msg: ""
                })  
            } else {        // set state variable if status code is not 200
                this.setState({
                    error_msg: response.data.message
                })
            }
        }).catch(function(error) {
            console.log(error);
        });
    }

    // Render method  to display the contents on browser
    render() {
        return (
            <div className="paymentOptions">
                <Navbar />
                <div className="error-bar">{this.state.error_msg}</div>
                <DisplayOptions paymentOptions={this.state.paymentOptions} orderId={this.state.orderId} />
            </div>
        )
    }

}

export default PaymentOption;