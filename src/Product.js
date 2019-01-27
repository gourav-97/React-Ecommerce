import React, { Component } from 'react';
import axios from 'axios';
import * as constant from './constant'
import {withRouter} from 'react-router-dom';
import './Product.css';

class Product extends Component {
    state = {
        CategoryName: "",
        product: {},
        responseData:null,
        Product : {
            "productId": "",
            "productName": "",
            "price": null,
            "imageUrl": "",
            "quantity": null,
            "brand":""
        },

    }

    handleClick=(product)=>{
        this.setState({
            Product:{
                "productId": product.productId,
                "productName": product.productName,
                "price": product.price,
                "imageUrl":"url",
                "quantity": product.quantity,   
                "brand": product.brand
            },
            message:""
        },()=>{
            this.handleAddToCart(product)});
        }
    handleAddToCart=(product)=>{
        axios.post(constant.ms2+'/cart/addToCart',
            this.state.Product,
        {'Content-Type':'application/json'}).then(response => {
            if(response.data.statusCode===200){
                this.setState({
                    message:response.data.message
                })
            }else{
                this.props.history.push({
                    pathname: "/error",
                    state:{
                        message:response.data.message
                    }
                })            
            }
        })
        .catch(error=>{
            console.log(error);
        })
    }
       
    handleBuyNow=(product)=>{
        console.log("Buying");
        this.setState({
            Product:{
                "productId": product.productId,
                "productName": product.productName,
                "price": product.price,
                "imageUrl":"url",
                "quantity": product.quantity,
                "brand":product.brand
            }
        },() => {
            axios.post(constant.ms2+'/cart/buy',this.state.Product,
            {'Content-Type':'application/json'})
            .then((response) => {
                this.setState({
                    message:response.data.message,
                    responseData:response.data.responseData
                })
                console.log(response.data.responseData)
                this.props.history.push({
                        pathname: "/checkout",
                        state:{
                            responseData:response.data.responseData
                        }
                    })
                }).catch((error)=>{
                console.log(error);
            }
            )}
        )
    }
    componentDidMount() {
        let productId = this.props.match.params.productId;
        axios.get(constant.ms1+'/products/' + productId)
            .then(res => {
                // console.log(res.data);
                if(res.data.statusCode===200){
                    this.setState({
                        product: res.data.responseData[0],
                    })
                }
                else{
                    this.props.history.push({
                        pathname: "/error",
                        state:{
                            message:res.data.message
                        }
                    })            
                }
            })
            .catch(error=> {
                console.log(error);
            });
    }
    render() {
        const product = this.state.product;
        let keys=[];
        let products1=product.genFeatures;
            for(let key in products1)
            {
                keys.push(key)
            }
        let keys2=[];
        let products2=product.prodSpecs;
            for(let key in products2)
            {
                keys2.push(key)
            }
    
            const items = []

            for (const [index, value] of keys.entries()) {
                items.push(<li key={index}>{value} : {products1[value]}</li>)
            }
            const items2 = []

            for (const [index, value] of keys2.entries()) {
                items2.push(<li key={index}>{value} : {products2[value]}</li>)
            }
        
        // console.log(product.genFeatures)
        return (
            <div className="products container">
                <hr/>
                <table><div className="row center message">{this.state.message}</div>
                        <div className="row">
                            <div className="col s12">
                                
                                <div className="row">
                                <tr><td><div className="collection-item col s6">Name:</div></td>
                                    <td><div className="collection-item col s6">{product.productName}</div></td></tr>
                                    <tr><td><div className="collection-item col s6">Price:</div></td>
                                    <td><div className="collection-item col s6">Rs.{product.price}</div></td></tr>
                                </div>          
                                <tr><div className="row">                                            
                                    <td><div className="collection-item col s3">General Features:</div></td>                 
                                    <td><div className="collection-item col s6">{items2}</div></td>
                                </div></tr>     
                                <div className="row">
                                    &nbsp;
                                    
                                    &nbsp;
                                </div>
                                
                            </div>
                            <div className="col s12">
                            <div className="row">
                            <tr><td><div className="collection-item col s6">Brand:</div></td>
                                    <td><div className="collection-item col s6">{product.brand}</div></td></tr>
                                    <tr><td><div className="collection-item col s6">Product Description:</div></td>
                                    <td><div className="collection-item col s6">{product.desc}</div></td></tr>
                                    <tr><td><div className="collection-item col s3">Product Features:</div></td>
                                    <td><div className="collection-item col s6">{items}</div></td></tr>
                                </div>
                                <div className="row">                    
                                    <button className="waves-effect waves-light btn-small" onClick={()=>{this.handleClick(product)}}>
                                        <i className="material-icons">add_shopping_cart</i>Add to cart
                                    </button> &nbsp;
                                    <button className="waves-effect waves-light btn-small" onClick={()=>{this.handleBuyNow(product)}}>
                                        <i className="material-icons">book</i>
                                        Buy Now</button>
                                </div>
                            </div>
                        </div>
                        </table>
                </div>
                
                )
    }
}
export default withRouter(Product);