import React,{Component} from 'react'
 import axios from 'axios'
import Card from './Card';
import './Checkout.css';



class ProductDetails extends Component{ 
    state={

    }
    render(){
               console.log(this.props);
         const  totalAmount  = this.props.totalCost;
         const productsList =this.props.productDetails;
         const product = productsList.map(cartItem => {
            return(
                 <div className="card-title" >
                                <div className="card-text">Product Name : {cartItem.item.productName}</div><br/>
                                <div className="card-text">Brand : {cartItem.item.brand}</div><br/>
                                <div className="card-text">Price : {cartItem.item.price}</div><br/>
                                <div className="card-text">Quantity : {cartItem.item.quantity}</div><br/>
                                <hr />
                </div>
            )

         })
        //  console.log(productsList.cartItemList[0].item.productName);
        return (
           <div className="card address-card" key={productsList.amountPayable} >
                               {product}
                               <div className="card-title"> Total Amount :{totalAmount}</div>
                         </div>

        )


        }
}



export default ProductDetails