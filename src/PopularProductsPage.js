import {Link} from 'react-router-dom';
import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'semantic-ui-react';
import * as constant from './constant';
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
             if(res.data.statusCode===200){
                 console.log(res.data)
                this.setState({
                        products:res.data.responseData,
                        subCatId:subcatid
                    })
                }
                else{
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
        const productsList = this.state.products.length ? (
            products.map((product, index) => {
                return (
                    <div className="products row" key={index}>
                        <hr/>
                        <Link to ={'/product/'+product.productId}>
                        <div className="collection-item col s3">Name:</div>
                        <div className="collection-item col s3">{product.productName}</div>
                        <div className="collection-item col s3">Brand:</div>
                        <div className="collection-item col s3">{product.brand}</div>
                        <div className="collection-item col s3">Price:</div>
                        <div className="collection-item col s3">Rs.{product.price}</div>
                        
                        <div className="collection-item col s3">Product Description:</div>
                        <div className="collection-item col s3">{product.desc}</div>
                        <div>
                    </div>
                         </Link>
                    </div>
                )
            })
        ) : (
                <div className="center">            
            <img src="https://i.imgur.com/T3Ht7S3.gif" width="120"></img>
        </div> 
        )
        return (
            <div className="container">
            <Button className="btn" onClick={()=>{this.handleFilter(4)}}>Filter By Greater Than 4</Button>
            <Button className="btn" onClick={()=>{this.handleFilter(5)}}>Filter By Greater Than 5</Button>
            <Button className="btn" onClick={this.handleSortLow}>Sort By Increasing Price</Button>
            <Button className="btn" onClick={this.handleSortHigh}>Sort By Decreasing Price</Button>

            {/* <input type="radio" value="4" checked={this.state.filterBy==4} onChange={this.handleOptionChange}/> */}
                {productsList}
            </div>
        )    
    }
    

}

export default PopularProductsPage;