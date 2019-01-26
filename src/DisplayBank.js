import React, { Component } from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import './DisplayBank.css';

// Class to display the bank list
class DisplayBank extends Component {

    // State variables
    state = {
        optionSelected: "",
        orderId: "",
        error_msg: ""
    }

    // Function to handle onChange event at bank options
    handleChange = (event) => {
        this.setState({     //  Set state variables when event triggers
            optionSelected: event.target.value,
            orderId: this.props.orderId
        });
    }

    // Function to handle form submit when user chooses from bank option
    handleSubmit = (event) => {
        event.preventDefault();
        axios.post('/payment/netbanking/data', {
            "optionSelected": this.state.optionSelected,
	        "orderId": this.state.orderId
        }).then((response) => {
            if(response.data.statusCode === 200) {
                this.props.history.push({       //  Redirect to show to payment status
                    pathname: "/payment/pay/status",
                    state: {
                        orderId: this.state.orderId
                    }
                });
            } else {        //  Else redirected to error page
                this.props.history.push('/payment/error');
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    render() {

        // Displayed the list of banks
        const {BankList} = this.props;
        const bankList = BankList.map(bank => {     //  Use of map to iterate through several options
            return (
                <div>
                    <div className="jumbotron">
                        {/* Displaying a radio button with each payment option */}
                        <input type="radio" name="optionSelected" value={bank} onChange={this.handleChange} required /> {bank} 
                    </div>
                </div>
            )
        })

        return(
            <div className="bank-list">
                <form onSubmit={this.handleSubmit}> 
                    {bankList}
                    <button>Pay Now</button>
                </form>
                <img className="bank_image" alt="Bank-clip-art" src="https://investorsking.com/wp-content/uploads/2018/03/bank.jpg" width="500" />
            </div>            
        )
    }
}

export default withRouter(DisplayBank);