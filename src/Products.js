import React, { Component } from 'react';
import axios from 'axios';

class Product extends Component {
    state = {
        CategoryName: "",
        Products: [],
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
        let catid = this.props.match.params.categoryId;
        let subcatid = this.props.match.params.subcategoryId;
        axios.get('http://localhost:8080/categories/' + catid + "/" + subcatid)
            .then(res => {
                console.log(res.data);
                if(res.data.statusCode==200){
                    this.setState({
                        Products: res.data.responseData,
                        CategoryName: name
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
        const prod = this.state;
        const products = prod.Products
        const productsList = this.state.Products.length ? (
            products.map((product, index) => {
                let features=[];
                let products1=product.genFeatures;
                for(let key in products1)
                   features.push(products1[key])
                return (
                    <div className="products row" key={index}>
                        <hr/>
                        <div className="collection-item col s3">Name:</div>
                        <div className="collection-item col s3">{product.productName}</div>
                        <div className="collection-item col s3">Brand:</div>
                        <div className="collection-item col s3">{product.brand}</div>
                        <div className="collection-item col s3">Price:</div>
                        <div className="collection-item col s3">Rs.{product.price}</div>
                        <div className="collection-item col s3">Product Description:</div>
                        <div className="collection-item col s3">{features.map(item=>{return item})}</div>
                        <div>
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
            })
        ) : (
                <div className="center">
                    No Products To Show
            </div>
            )
        return (
            <div>
                {productsList}
            </div>
        )
    }
}
export default Product;