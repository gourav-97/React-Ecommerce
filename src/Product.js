import {Link} from 'react-router-dom';
import React, { Component } from 'react';
import axios from 'axios';

class ProductsPage extends Component {
    state = {
        CategoryName: "",
        product: {},
        Product : {
            "id": "",
            "name": "",
            "price": null,
            "imageUrl": "",
            "quantity": null
        },
    }

    handleClick=(product)=>{
        this.setState({
            Product:{
                "name": product.productName,
                "id": product.productId,
                "price": product.price,
                "imageUrl":"url",
                "quantity": product.quantity   
            }
        },()=>{
            this.handleAddToCart(product)});
        }

    handleAddToCart=(product)=>{
        console.log(this.state.Product)
        axios.post('http://samyak3.localhost.run/cart/addToCart',
            this.state.Product,
        {'Content-Type':'application/json'}).then(response => {
            console.log(response)
        })
        .catch(error=>{
            console.log(error);
        })
    }
    componentDidMount() {
        let name = this.props;
        // console.log(this.props)
        let productId = this.props.match.params.productId;
        axios.get('http://localhost:8080/products/' + productId)
            .then(res => {
                console.log(res.data);
                if(res.data.statusCode===200){
                    this.setState({
                        product: res.data.responseData[0],
                    })
                }
                else{
                    alert(res.data.message)
                }
            })
            .catch(error=> {
                console.log(error);
            });
    }
    render() {
        const product = this.state.product;
        let features=[];
        let products1=product.genFeatures;
            for(let key in products1)
                features.push(products1[key])
        console.log(product.genFeatures)
        return (
            <div className="products left">
                <hr/>
                    <div className="row">
                        <div className="collection-item col s6">Name:</div>
                        <div className="collection-item col s6">{product.productName}</div>
                    </div>

                    <div className="row">
                        <div className="collection-item col s6">Brand:</div>
                        <div className="collection-item col s6">{product.brand}</div>
                    </div>
                    <div className="row">
                        <div className="collection-item col s6">Price:</div>
                        <div className="collection-item col s6">Rs.{product.price}</div>
                    </div>
                                            
                    <div className="row">
                        <div className="collection-item col s6">Product Description:</div>
                        <div className="collection-item col s6">{product.desc}</div>
                    </div>
                    <div className="row">                    
                        <div className="collection-item col s3">Product Features:</div>
                        <div className="collection-item col s3">
                        </div>
                    </div>
                    <div className="row">                    
                        <div className="collection-item col s3">General Features:</div>                    
                    </div>
                    <div className="row">                    
                        <button className="waves-effect waves-light btn-small">
                            <i className="material-icons">add_shopping_cart</i>
                        </button>
                        &nbsp;
                        <button className="waves-effect waves-light btn-small" onClick={()=>{this.handleClick(product)}}>
                            <i className="material-icons">book</i>
                            Buy Now</button>
                        &nbsp;
                    </div>
                </div>
                )
        return (
            <div>
                {/* {productsList} */}
            </div>
        )
    }
}
export default ProductsPage;