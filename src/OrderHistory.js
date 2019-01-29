import React,{Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import cart from './cart.png'
import * as constant from './constant';
import './OrderHistory.css';
// import  Material from 'material';
class Home extends Component{
    state = {
        summaries:[ ] 
     
    }
    componentDidMount = () => {
        axios.get(constant.ms4+'/orderSummary/')
            .then(res =>{
                if((res.data.statusCode)===200){
               console.log(res)
               this.setState({
                summaries:res.data.responseData
               })
            }
            else{
                this.props.history.push({
                    pathname: "/error",
                    state:{
                        message:res.data.message
                    }
                })            
            }   
            }).catch(error=>{
            console.log(error)
        });
            
    }

    render() {
        const { summaries } =this.state;
        const summaryList = summaries.length ? (
            summaries.map(summary =>{
                return (
                        <div className="post card" key={summary.order_id} >
                            {/* <div className="card-title"> */}
                                <img className="order-summery-img" width="100" src={cart} alt="A Cart"/>
                                <Link to={'/orderSummary/' + summary.order_id}>
                                    <div className="order-id card-title">Order Id:  {summary.order_id}</div>
                                    <div className="summary-data">Payment Id: {summary.payment_id}</div>
                                </Link>
                            {/* </div> */}
                            <div className="">
                                <span className="summary-data">Date of Purchase: {summary.date_of_purchase}</span>
                                { summary.products.length?(summary.products.map(product=>{
                                        return (
                                            <div key={product.productId}>
                                            <div className="summary-data" key= {product.productId}>Product Name: {product.productName}</div>
                                            </div>
                                        )
                                    })) : (<div className="center">No products to show</div>)
                                }
                                </div>
                                <div className="summary-status"><kbd>{summary.status}</kbd></div>
                         </div>
                        )
                })
        ): (
            <div className="center"><img alt="Sorry..Loading" src="https://i.imgur.com/T3Ht7S3.gif" width="120"></img></div>
        )
        return (
            <div className="container">
            
             <h4 className="center">Order History</h4>
             {summaryList}
            </div>

        )          
        }

        
}

export default Home;