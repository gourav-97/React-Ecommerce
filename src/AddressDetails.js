import React ,{ Component } from 'react';
import ProductDetails from './ProductDetails';
import Axios from 'axios';

class AddressDetails  extends Component {
    
    state = {
        street:null,
        colony:null,
        city:null,
        state:null,
        pinCode:null,
        error_msg:''
  }
    
      handleChange=(e) => {
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
        this.props.myCallBack(this.state);
        {this.validatePinCode()};
    }

   render(){
       return (

          
        <div className="conatiner" >
                <div className="error-bar">{this.state.error_msg}</div>
                <h2 className="card-text">Please enter your delivery address</h2>
            <form className="card-form" onSubmit={this.handleSubmit}>
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
                <button>Submit</button>
            </form>
      </div>
            
            
    )
   }
}
export default AddressDetails