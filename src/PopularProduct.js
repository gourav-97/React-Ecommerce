import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './Category.css';
class PopularProducts extends Component{
    state={
        popularProducts:{ },
        statusCode:null
    }

    componentDidMount(){
        axios.get('http://localhost:8080/displayByPopularScore')
            .then(res =>{
                console.log(res);
                if((res.data.statusCode)===200){
                    this.setState({
                        popularProducts:res.data.responseData
                    })    
                }
                else{
                    alert(res.data.message);
                }
            })
    }

    render(){
    const {popularProducts}=this.state;
    console.log(popularProducts)
    const productsList = popularProducts.length ?(
            popularProducts.map(product =>{
                return(
                    <div className="products card" key={product.productId}>
                        <Link to={{pathname:'/product/'+product.productId,state:{productName:product.productName} }}>
                        <div className="card-content">  
                            <span className="card-name">Product Name: {product.productName}</span>
                            <p>Description: {product.desc}</p>
                        </div>
                        {/* <img className="card-image" src={category.picURL} alt=""/> */}
                        </Link>
                    </div>
                )
            })
    ):(
        <div className="center">
            No Products To Show
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