import React,{Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import cart from './cart.png'
// import  Material from 'material';
import {ms4} from './constant/links'
class Home extends Component{
    state = {
        summaries:[ ] 
     
    }
    componentDidMount = () => {
        axios.get('http://ujjwal.localhost.run/orderSummary/')
            .then(res =>{
               console.log(res)
               this.setState({
                summaries:res.data.responseData
               })
            })
            
    }
     renderStatus(status){
        
    }
    
   
    render() {
        const { summaries } =this.state;
        const summaryList = summaries.length ? (
            summaries.map(summary =>{
                return (
                                <div className="post card" key={summary.order_id} >
                                <img src={cart} alt="a cart"/>
                                <div className="card-content">
                                <Link to={'/orderSummary/' + summary.order_id}>
                                <div className="card-title">Order Id:  {summary.order_id}</div>
                                </Link>
                                <span className="card-text">Date of Purchase{summary.date_of_purchase}</span>
                                { summary.products.length?(summary.products.map(product=>{
                                        return (
                                            <div key={product.productId}>
                                            <div className="card-text" key= {product.productId}>Product name: {product.productName}</div>
                                            <br/>
                                            </div>
                                        )
                                    })) : (<div className="center">No products to show</div>)
                                }
                                <div className="card-text">{summary.status}</div>
{/*                        
                                {this.renderStatus(summary.status)} */}
                                 
    
                                </div>
                         </div>
                        )
                })
        ): (
            <div className="center">No orders to show</div>
        )
        return (
            <div className="container">
                {/* <Material /> */}
             <h4 className="center">Order History</h4>
             {summaryList}
            </div>

        )          
        }

        
}

export default Home;