import React, { Component } from 'react';
import './CardDetails.css';
import axios from 'axios';
import * as constant from './constant';

// Class to enter card details
class CardDetails extends Component {

    // State variables
    state = {
        cardType: "",
        cardName: "",
        cardNumber: "",
        validDate: "",
        cvv: "",
        error_msg: "",
        orderId: ""
    }

    componentDidMount = () => {
        
        // set state variables on body load
        this.setState ({
            cardType: this.props.match.params.mode,
            orderId: this.props.location.state.orderId
        })
    }

    //  Function to validate cardNumber
    validateCardNumber = () => {
        let oddSum = 0;
        let evenSum = 0;
        if(this.state.cardNumber.length !== 16)
            return false;

        if(this.state.cardType === "CreditCard") {  //  validate if it is credit card
            
            // Luhn Algorithm for credit card validation
            let i = this.state.cardNumber.length - 1;
            for(; i >= 0; i--) {
                if(i % 2 !== 0) {
                    oddSum += this.state.cardNumber[i] - '0';
                }
                else
                {
                    let temp = (this.state.cardNumber[i] - '0') * 2;
                    evenSum += temp / 10 + temp % 10;
                }
            }
            evenSum = parseInt(evenSum);
            oddSum = parseInt(oddSum);
            console.log(evenSum, oddSum);
            if((evenSum + oddSum) % 10 === 0)
                return true;
            else if((evenSum + oddSum) % 10 !== 0)
                return false;
        } else {
            return true;
        }
    }

    // Function to validate cvv
    validateCvv = () => {
        if(this.state.cvv.length < 3 || this.state.cvv.length > 4) {
            return false;
        } else {
            return true;
        }
    }

    // Function to handle values in textbox
    handleChange = (event) => {
        this.setState ({
            [event.target.name]: event.target.value
        });
    }

    // Funtion to save card details on submit
    handleSubmit = (event) => {
        event.preventDefault();
        if(!this.validateCardNumber()) {

            this.setState({
                error_msg: "Please enter a valid card Number!"
            })
        } else {

            this.setState({
                error_msg: ""
            })

            if(!this.validateCvv()) {
                this.setState({
                    error_msg: "Please enter a valid CVV!"
                })
            } else {
                this.setState({
                    error_msg: ""
                })
            }
        }

        // axios post request to send the data to backend
        axios.post(constant.ms3+'/payment/card', {

            "cardNumber": this.state.cardNumber,
            "cardType": this.state.cardType,
            "cvv": this.state.cvv,
            "expiryDate": this.state.validDate,
            "name": this.state.cardName,
            "orderId": this.state.orderId

        }).then((response) => {

            if(response.data.statusCode === 200) {  //  Display status if status code is 200
                this.props.history.push({
                    pathname: "/payment/pay/status",
                    state: { 
                        'orderId': response.data.responseData.orderId 
                    }
                });
            } else {
                // console.log(response.data.message);
                this.setState({
                    error_msg: response.data.message
                })
            }

        }).catch((error) => {
            console.log(error);
        })
    }

    render() {
        return(
            <div className="card-details">
                <div className="error-bar">{this.state.error_msg}</div>
                <form className="card-form" onSubmit={this.handleSubmit}>
                    <input type="text" name="cardName" placeholder="Name on Card" className="card-name" value={this.state.cardName} onChange={this.handleChange} required /><br />
                    <input type="text" pattern="[0-9]*" name="cardNumber" placeholder="Card Number" className="card-number" value={this.state.cardNumber} onChange={this.handleChange} maxLength="16" minLength="16" required /><br />
                    <input type="text" name="validDate" placeholder="Valid Thru" className="valid-date" value={this.state.validDate} onChange={this.handleChange} required />
                    <input type="text" pattern="[0-9]*" name="cvv" placeholder="CVV" className="cvv" value={this.state.cvv} onChange={this.handleChange} maxLength="4" minLength="3" required /><br />
                    <button className="waves-effect waves-light btn-small">Proceed to Pay</button>
                </form>
                <img alt="card-type" className="card-type" src="http://www.pngmart.com/files/3/Credit-Card-Visa-And-Master-Card-Transparent-PNG.png" width="300 "/>
            </div>
        )
    }
}

export default CardDetails;