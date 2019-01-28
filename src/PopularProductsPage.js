import {Link} from 'react-router-dom';
import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'semantic-ui-react';
import * as constant from './constant';
import './PopularProductsPage.css';

class PopularProductsPage extends Component
{
    state={
        products:[],
        subCatId:null
    }
    componentDidMount(){
        let subcatid = this.props.match.params.subCategoryId;
        axios.get(constant.ms1+'/categories/'+subcatid+'/products')
         .then(res =>{
            console.log(res.data)
            if(res.data.statusCode===200){
                this.setState({
                        products:res.data.responseData,
                        subCatId:subcatid
                    })
                }
                else{
                    console.log(res.data.message)
                    this.setState({
                        message:res.data.message
                    })
                }
         }).catch(error=>{
            console.log(error);
        });
    }

    handleFilter=(value)=>{
        axios.get(constant.ms1+'/filterByPopularScore/'+this.state.subCatId+'/'+value)
        .then(res=>{
            console.log(res);
            if(res.data.statusCode===200){
                this.setState({
                    products:res.data.responseData,
                })
            }
        }).catch(error=>{
            console.log(error);
        });
    }
    handleSortLow=()=>{
        axios.get(constant.ms1+'/sortByPriceLTH/'+this.state.subCatId)
        .then(res=>{
            console.log(res);
            if(res.data.statusCode===200){
                this.setState({
                    products:res.data.responseData,
                })
            }
        }).catch(error=>{
            console.log(error);
        });
    }
    handleSortHigh=()=>{
        axios.get(constant.ms1+'/sortByPriceHTL/'+this.state.subCatId)
        .then(res=>{
            console.log(res);
            if(res.data.statusCode===200){
                this.setState({
                    products:res.data.responseData,
                })
            }
        }).catch(error=>{
            console.log(error);
        });
    }

    render(){
        const products = this.state.products
        const productsList = products.map((product, index) => {
                return (
                    <div className="products row" key={index}>
                        <hr/>
                        <Link to ={'/product/'+product.productId}>
                        <img className="left" width="150" src="https://www.brother.ca/resources/images/no-product-image.png" alt=""/> 
                        <div className="product-preview">
                        <div className="collection-item col s3">Name: {product.productName}</div>
                        <div className="collection-item col s3">Brand: {product.brand}</div>
                        <div className="collection-item col s3">Ratings: {product.popularScore} stars</div>  
                        
                        <div className="collection-item col s3">Product Description:</div>
                        <div className="collection-item col s6">{product.desc}</div>

                        <div className="collection-item col s6 price">Price: ₹{product.price}</div>

                        

                        <div>
                        </div>
                    </div>
                         </Link>
                    </div>
                )
            })
        return (
            productsList.length?(
                            <div className="container">
            <Button className="btn popularFilter" onClick={()=>{this.handleFilter(3)}}>Average Rated</Button>
            <Button className="btn popularFilter" onClick={()=>{this.handleFilter(5)}}>Top Rated</Button>
            <Button className="btn popularFilter" onClick={this.handleSortLow}>Show Low to High</Button>
            <Button className="btn popularFilter" onClick={this.handleSortHigh}>Show High to Low</Button>
                {productsList}
            </div>
            ):(
                this.state.message ? (
                    <div className="center">
                           <h2>{this.state.message}</h2>
                   </div>
               ) : (
                   <div className="center">
                       <img src="https://i.imgur.com/T3Ht7S3.gif" width="120"></img>
                   </div>
               )
            )
        )    
    }
    

}

export default PopularProductsPage;