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
                        <Link to={{pathname:'/product/'+product.productId,
                                    state:{productName:product.productName,url:product.category}}}>
                        <div className="extended-card">
                        {/* <img className="card-image left" width="10px" src="https://www.brother.ca/resources/images/no-product-image.png" alt=""/>  */}
                        <img className="card-image left" width="10px" src={product.category} alt=""/> 
                        <div className="card-content right card-data-home">  
                            <span className="card-title">{product.productName}</span>
                            <p>&nbsp; &nbsp; &nbsp;{product.desc}</p>
                            <p>&nbsp; &nbsp; &nbsp;{product.brand}</p> 
                            <p>&nbsp; &nbsp; &nbsp;Price: ₹{product.price}</p>
                        </div>
                        </div>
                        </Link>
                    </div>
                )
            })
    ):(
        <div className="center">
            <img alt="Sorry..Loading" src="https://i.imgur.com/T3Ht7S3.gif" width="120"></img>
        </div>
    )
    return(
            <div className="container" >
            <h4 className="center">Popular Products</h4>
            {productsList}            
            </div>  
    )}
}

export default PopularProducts;