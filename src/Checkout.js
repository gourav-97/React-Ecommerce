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
        products: [{
                 productId : this.props.location.state.Product.cartItemList[0].item.productId,
                productName: this.props.location.state.Product.cartItemList[0].item.productName,
                    brand:null,
                    price:this.props.location.state.Product.amountPayable,
                    quantity:this.props.location.state.Product.cartItemList[0].item.quantity
        }],
        cartId:null,
        totalCost:this.props.location.state.Product.amountPayable
    }; 
     myCallBack = (addressDetails) => {
        console.log(addressDetails);
        this.setState({
            addressDetails: this.addressDetails,
        });
         console.log(this.state.products);
        var headers = {
            'Content-Type': 'application/json'
        }
          console.log(this.state.products);
          console.log(this.state.cartId);
          console.log(this.state.addressDetails);
          console.log(this.state.totalCost);
         axios.post(constant.ms4+'/addCartEntry',{
             cartId: this.state.cartId,
             products: this.state.products ,
             address : addressDetails ,
             totalCost:this.state.totalCost 
         },{headers: headers}).then(res =>{
             console.log(res);
         });
         
    
    };

    // componentDidMount = () => {
    //     console.log("helooooo");
    // }
   

    render(){
    
        console.log(this.props.location.state)
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
                Hello   
             <div style={rightCom}><ProductDetails productDetails={this.props.location.state}/></div>  
            <div style={leftCom}><AddressDetails myCallBack={this.myCallBack} /></div>
            {/* <material /> */}
        </div>
        )
    }

}


export default Checkout;
