import React, { Component } from 'react';
import axios from 'axios';
import Category from './Category';

class Product extends Component {
    state = {
        CategoryName: "",
        Products: [],
        Product : {
            "id": "P01",
            "name": "One Plus 6T",
            "price": 4000,
            "imageUrl": "url",
            "quantity": 3
        },
        // Category : {
        //     "categoryName":"",
        //     "ParentId":null,
        //     "desc":"",
        //     picURL:"",
        // }
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
        //     this.setState({
        //         Category : {
        //             "categoryName":product.productName,
        //             "ParentId":product.productId,
        //             "desc":product.desc,
        //             picURL:product.picURL,
        //         }
        // },()=>{this.handleAddToCart(product)});
        }

        handleAddToCart=(product)=>{
            console.log(this.state.Product)
            fetch('/cart/addToCart', {
            method: 'POST',
            body: JSON.stringify(this.state.Product),
            json:true,
            headers: {
              "Content-type": "application/json",
              "cache-control":"no-cache"
            }
          }).then(response => {
              console.log(response)
          })
          .catch(error=>{
              console.log(error);
          })
    
          // fetch('/addCategory', {
        //     method: 'POST',
        //     body: JSON.stringify(this.state.Category),
        //     headers: {
        //       "Content-type": "application/json; charset=UTF-8"
        //     }
        //   })
        //   .then(response => {
        //       console.log(response)
        //   })
        //   .catch(error=>{
        //       console.log(error);
        //   })
    }
    componentDidMount() {
        let name = this.props;
        // console.log(this.props)
        let catid = this.props.match.params.categoryId;
        let subcatid = this.props.match.params.subcategoryId;
        axios.get('/categories/' + catid + "/" + subcatid)
            .then(res => {
                // console.log(res);
                this.setState({
                    Products: res.data,
                    CategoryName: name
                })
            })
            .catch(error=> {
                console.log(error);
            });
    }
    render() {
        // console.log(this.state.Products)
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
                        {/* {console.log(this.state.Products[index])+"Hello"} */}
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
                            <button className="waves-effect waves-light btn-small" onClick={()=>{this.handleAddToCart(product)}}>
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