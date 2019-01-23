import React, { Component } from 'react';
import axios from 'axios';

class Product extends Component {
    state = {
        CategoryName: "",
        Products: [],
    }
    componentDidMount() {
        let name = this.props;
        console.log(this.props)
        let catid = this.props.match.params.categoryId;
        let subcatid = this.props.match.params.subcategoryId;
        axios.get('/categories/' + catid + "/" + subcatid)
            .then(res => {
                console.log(res);
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
        console.log(this.state.Products)
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
                            <button className="waves-effect waves-light btn-small">
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