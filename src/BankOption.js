import React, { Component } from 'react';
import axios from 'axios';
import DisplayBank from './DisplayBank';
import Navbar from './Navbar';

// Class to display payment options by sending get request at /payment/init
class BankOption extends Component {

    // State variables
    state = {
        BankList: [],
        orderId: "",
        error_msg: ""
    }

    // componentDidMount to receive payment options before loading the page
    componentDidMount = () => {
        // console.log(this.props.location.state.orderId);
        axios.post('/payment/netbanking', {
            "orderId": this.props.location.state.orderId
        }).then((response) => {
            // console.log(response.data);
            if(response.data.statusCode === 200) {
                this.setState({
                    BankList: response.data.responseData.options,
                    orderId: response.data.responseData.orderId,
                    error_msg: ""
                })
            } else {
                this.setState({
                    error_msg: response.data.message
                })
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    // Render method  to display the contents on browser
    render() {
        return (
            <div className="bankOptions">
                <Navbar />
                <div className="error-bar"></div>
                <DisplayBank BankList={this.state.BankList} orderId={this.state.orderId} />
            </div>
        )
    }

}

export default BankOption;