import React ,{ Component } from 'react';
import ProductDetails from './ProductDetails';
import Axios from 'axios';
import {withRouter} from 'react-router-dom';
import './Checkout.css';

class AddressDetails  extends Component {
    
    state = {
        street:null,
        colony:null,
        city:null,
        state:null,
        pinCode:null,
        error_msg:''
  }

    validateStreet = () => {
        if(this.state.street.trim() === "" || this.state.street.trim() === null) {
            return false;
        } 
        return true;
    }
    validateColony = () => {
        if(this.state.colony.trim() === "" || this.state.colony.trim() === null) {
            return false;
        } 
        return true;
    }
    validateCity = () => {
        if(this.state.city.trim() === "" || this.state.city.trim() === null) {
            return false;
        } 
        return true;
    }
    
      handleChange=(e) => {
          const val=e.target.value
        this.setState({
            [e.target.id] : e.target.value
         })
      }

    //   validatePinCode = () =>{
    //      var headers = {
    //         'Content-Type': 'application/json'
    //     }
    //     Axios.post('http://demo0655277.mockable.io/',{
    //       pinCode:this.state.pinCode
    //     },{headers: headers}).then(res =>{
    //         console.log(res);
    //     });

    handleSubmit =(e) => {
        e.preventDefault();
        if(!this.validateStreet()) {
            this.setState({
                error_msg: "Address details are invalid!"
            });
            return false;
        } else if(!this.validateColony()) {
            this.setState({
                error_msg: "Address details are invalid!"
            });
            return false;
        } else if(!this.validateCity()) {
            this.setState({
                error_msg: "Address details are invalid!"
            });
            return false;
        } else {
            this.props.myCallBack(this.state);
        }
        // {this.validatePinCode()};
    }

   render(){
       return (
        <div className="conatiner" >
                <div className="error-bar">{this.state.error_msg}</div>
            <form className="card-form" onSubmit={this.handleSubmit}>
                <h2 >Please Enter your Delivery Address</h2>
                <label htmlFor="street">Street:</label>
                <input type="text" placeholder="Street" className="card-name"id="street" onChange={this.handleChange} required/>
                <label htmlFor="colony">Colony:</label>
                <input type="text" id="colony" onChange={this.handleChange} required/>
                <label htmlFor="city">City:</label>
                <input type="text" id="city" onChange={this.handleChange} required/>
                <label htmlFor="state">State:</label>
                <input type="text" pattern="[a-zA-Z]*" id="state" onChange={this.handleChange} required />
                <label htmlFor="pincode">Pincode:</label>
                <input type="text" pattern="[0-9]*" id="pinCode" onChange={this.handleChange} maxLength="6" minLength="6" required/>
                <button className="waves-effect waves-light btn-small">Pay Now</button>
            </form>
      </div>
            
            
    )
   }
}
export default withRouter(AddressDetails);