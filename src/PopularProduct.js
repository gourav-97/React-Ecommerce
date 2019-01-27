import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './Category.css';
import './PopularProducts.css';
import * as constant from './constant'
class PopularProducts extends Component{
    state={
        popularProducts:{ },
        statusCode:null
    }

    componentDidMount(){
        axios.get(constant.ms1+'/displayByPopularScore')
            .then(res =>{
                console.log(res);
                if((res.data.statusCode)===200){
                    this.setState({
                        popularProducts:res.data.responseData
                    })    
                }
                else{
                    // alert(res.data.message);
                }
            }).catch(error=>{
                console.error()
            })
    }

    render(){
    const {popularProducts}=this.state;
    console.log(popularProducts)
    const productsList = popularProducts.length ?(
            popularProducts.map(product =>{
                return(
                    <div className="product card" key={product.productId} style={{width:"48%", height:"50%", margin:"5px"}}>
                        <Link to={{pathname:'/product/'+product.productId,state:{productName:product.productName} }}>
                        <div className="card-content">  
                            <span className="card-name">Product Name: {product.productName}</span>
                            <p>Description: {product.desc}</p>
                        </div>
                        {/* <img className="card-image" src={category.picURL} alt=""/>  */}
                        </Link>
                    </div>
                )
            })
    ):(
        <div className="center">
            Loading Products
        </div>
    )
    return(
            <div className="container" >
            <h4 className="center">Products</h4>
            {productsList}            
            </div>  
    )}
}

export default PopularProducts;