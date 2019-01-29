import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

// Class to redirect to respective banking page
class Banking extends Component {

    componentDidMount = () => {
        
        // For Debit Card
        if(this.props.match.params.mode === "DebitCard") {
            this.props.history.push({       //  Redirect to specific page
                pathname: "/payment/debitcard/details",
                state: {
                    'orderId': this.props.location.state.orderId
                }
            });
        }

        // For Credit Card
        else if(this.props.match.params.mode === "CreditCard") {
            this.props.history.push({
                pathname: "/payment/creditcard/details",
                state: {
                    'orderId': this.props.location.state.orderId
                }
            });
        }

        // For NetBanking
        else if(this.props.match.params.mode === "NetBanking") {
            this.props.history.push({
                pathname: "/payment/netbanking/list_banks",
                state: {
                    'orderId': this.props.location.state.orderId
                }
            });
        }

        // For EMI
        else if(this.props.match.params.mode === "EMI") {
            this.props.history.push({
                pathname: "/payment/creditcard/details",
                state: {
                    'orderId': this.props.location.state.orderId
                }
            });
        }

        // For COD
        else if(this.props.match.params.mode === "COD") {
            this.props.history.push({
                pathname: "/payment/pay/status",
                state: {
                    'orderId': this.props.location.state.orderId
                }
            });
        }
        else {
            this.props.history.push('/payment/error');
        }
            
    }

    render() {
        return (
            <div className="bank">
            </div>
        )
    }
}

export default withRouter(Banking);