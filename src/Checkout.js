import React,{Component} from 'react'
import ProductDetails from './ProductDetails';
import AddressDetails from './AddressDetails';
import axios from 'axios';
import * as constant from './constant';
class Checkout extends Component{
    // state ={
    //     addressDetails : 
    //         {
    //             street:null,
    //             colony:null,
    //             city:null,
    //             state:null,
    //             pinCode:null
    //         }

    // }; 
    // myCallBack = (addressDetails) => {
    //     console.log(addressDetails);
    //     this.setState({
    //         addressDetails: this.addressDetails
    //     });

    //     var headers = {
    //         'Content-Type': 'application/json'
    //     }

    //      const {products, totalCost, cartId} =this.props;
    //       console.log(products);
    //       console.log(cartId);
    //       console.log(addressDetails);
    //       console.log(totalCost);
    //      axios.post(constant.ms4+'/addCartEntry/',{
    //          cartId: cartId,
    //          products: products ,
    //          address : addressDetails ,
    //          totalCost:totalCost 
    //      },{headers: headers}).then(res =>{
    //          console.log(res);
    //      });

    
    // };

    // componentDidMount = () => {
    //     console.log("helooooo");
    // }
   

    render(){
        console.log("teri maa kesi")
        console.log(this.props)
        // let leftCom = {
        //     float:'left',
        //     width:'70%'
        // };

        // let rightCom = {
        //     float:'right',
        //     width:'30%'
        // };
        return(
            <div>         
                Hello   
            {/* { <div style={rightCom}><ProductDetails/></div> } */}
            {/* <div style={leftCom}><AddressDetails myCallBack={this.myCallBack} /></div> */}
            {/* <material /> */}
        </div>
        )
    }

}

// const mapStateToProps = (state) => {

//     return {
//         products: state.products,
//         totalCost: state.totalCost,
//         cartId: state.cartId

//     }
// }

// export default connect(mapStateToProps)(CheckoutComponent)
export default Checkout;
