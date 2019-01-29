import React, { Component } from 'react'
import axios from 'axios'
import * as constant from './constant';
import './SingleOrder.css';
class SingleOrder extends Component {
    state = {
        order: null,
        status: "",
    }

    componentDidMount() {
        console.log(this.props);
        let id = this.props.location.state.orderId;
        axios.get(constant.ms4 +'/orderSummary/' + id)
            .then(res => {
                if((res.data.statusCode)===200){
                this.setState({
                    order: res.data.responseData,
                    status: res.data.responseData.status
                })
                 console.log(this.state.status)
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
   
    cancelOrder = () => {
        console.log(this.state.order)
        axios.get(constant.ms4+'/cancelOrder/'+ this.state.order.order_id)
        .then(res =>{
            if((res.data.statusCode)===200){
                console.log(res)
                this.setState({
                 cancelStatus:"Order Cancelled",
                 status:"Cancelled"
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

        const order = this.state.order ? (

            <div className="post card" key={this.state.order.order_id} >
                <div className="card-content post-content">
                    <div className="card-title post-title"><b>Booking Number:</b>{this.state.order.order_id}</div><br />
                    <span className="card-title"><b>Date of Purchase</b>{this.state.order.date_of_purchase}</span><br />
                    <div className="card-title"><b>Shipping Address :</b> {this.state.order.address.street},{this.state.order.address.colony},{this.state.order.address.city},{this.state.order.address.state}, {this.state.order.address.pinCode}</div><br />
                    {this.state.order.products.length ? (
                        this.state.order.products.map(product => {
                            return (
                                <div>
                                    <div className="card-title"><b>Product name:</b> {product.productName}</div>
                                    <div className='card-title'><b>product price:</b> ₹{product.price}</div>
                                    <div className='card-title'><b>product quantity:</b> {product.quantity}</div>
                                    <br />
                                </div>
                            )
                        }
                        )
                    ) : (<div className="center">No products to show</div>)
                    }
                 <div className="card-title"><b>Order Status:</b> {this.state.status}</div>
                 <button className="btn-danger btn" disabled={(this.state.status==="Delivered")||(this.state.status==="Cancelled")||(this.state.status==="Awaiting")} onClick={this.cancelOrder}><i className="material-icons right">cancel</i>Cancel Order</button>
                 </div>
            </div>

        ) : (
                <div className='center'>  <img alt=" Sorry...Loading" src="https://i.imgur.com/T3Ht7S3.gif" width="120"></img></div>
            )
        return (
            <div className="container">
                <h4>
                    {order}
                </h4>

            </div>
        )
    }
}

export default SingleOrder;