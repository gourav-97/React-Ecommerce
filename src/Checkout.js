import React,{Component} from 'react'
import ProductDetails from './ProductDetails';
import AddressDetails from './AddressDetails';
import axios from 'axios'
import * as constant from './constant';
class Checkout extends Component{
    state ={
        addressDetails :            {
                street:null,
                colony:null,
                city:null,
                state:null,
                pinCode:null
        },
        products: [],
        cartId:null,
        totalCost:this.props.location.state.responseData.amountPayable
    }; 
     myCallBack = (addressDetails) => {
        const prod =this.props.location.state.responseData.cartItemList;
        
        console.log(prod);

        var mlist = []

        prod.map(pro => {
             console.log(pro["item"])
             mlist.push(pro["item"]);
            });

        console.log(mlist);
        this.setState({
            addressDetails: this.addressDetails,
        });
    
        var headers = {
            'Content-Type': 'application/json'
        }
     
         axios.post(constant.ms4+'/addCartEntry',{
             cartId: this.state.cartId,
             products: mlist ,
             address : addressDetails ,
             totalCost:this.state.totalCost 
         },{headers: headers}).then(res =>{
             console.log(res.data.responseData.orderId);
             this.props.history.push({
                 pathname: '/paymentOption',
                 state: {
                     "orderId": res.data.responseData.orderId 
                 }
             })
         });
         
    
    };

  
    render(){
    
        console.log(this.props.location.state.responseData)
        let leftCom = {
            float:'left',
            width:'70%'
        };

        let rightCom = {
            float:'right',
            width:'30%'
        };
        return(
            <div>         
             <div style={rightCom}><ProductDetails productDetails={this.props.location.state.responseData.cartItemList}/></div>  
            <div style={leftCom}><AddressDetails myCallBack={this.myCallBack} /></div>
            {/* <material /> */}
        </div>
        )
    }

}


export default Checkout;
