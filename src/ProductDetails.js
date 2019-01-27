import React,{Component} from 'react'
 import axios from 'axios'
import Card from './Card';



class ProductDetails extends Component{ 
    render(){
        console.log(this.props)
        
        const  productsList  = this.props.productDetails.Product;
        console.log(productsList.cartItemList[0].item.productName);
        return (
           <div className="post card" key={productsList.amountPayable} >
                                <div className="card-content">
                                <div className="card-title"> Total Cost {productsList.amountPayable}</div>                                
                                <div className="card-title">Product Details </div>
                                <div className="card-text">Product Name : {productsList.cartItemList[0].item.productName}</div>                               
                                <div className="card-text">Quantity: {productsList.cartItemList[0].item.quantity}</div>  
                                </div>
                         </div>

        )


        }
}



export default ProductDetails