import React, { Component } from 'react'
import axios from 'axios'
import * as constant from './constant';
import './SingleOrder.css';
class SingleOrder1 extends Component {
    state = {
        order: null,
        status: "",
    }

    componentDidMount() {
        console.log(this.props);
        let id = this.props.match.params.orderId;
        axios.get(constant.ms4 +'/orderSummary/' + id)
            .then(res => {
                this.setState({
                    order: res.data.responseData,
                    status: res.data.responseData.status
                })
                 console.log(this.state.status)
            })

    }
   
    cancelOrder = () => {
        console.log(this.state.order)
        axios.get(constant.ms4+'/cancelOrder/'+ this.state.order.order_id)
        .then(res =>{
           console.log(res)
           this.setState({
            cancelStatus:"Order Cancelled",
            status:"Cancelled"
            })
        })
       
    }

    showButton = () => {
        console.log("herhehrehwehrh")
        if(this.state.status === "Confirmed" || this.state.status=== "OutForDelivery"){
       return  <a href="#" className="waves-effect waves-light btn" onClick={this.cancelOrder}><i className="material-icons right">cancel</i>Cancel Order</a>
        }
    }

    render() {

        const order = this.state.order ? (

            <div className="post card" key={this.state.order.order_id} >
                <div className="card-content">
                    <div className="card-title post-title"><b>Order Id:</b>{this.state.order.order_id}</div><br />
                    <span className="card-title"><b>Date of Purchase:</b>{this.state.order.date_of_purchase}</span><br />
                    <div className="card-title"><b>Shipping Address :</b> {this.state.order.address.street},{this.state.order.address.colony},{this.state.order.address.city},{this.state.order.address.state}, {this.state.order.address.pinCode}</div><br />
                    {this.state.order.products.length ? (
                        this.state.order.products.map(product => {
                            return (
                                <div>
                                    <div className="card-title"><b>Product name:</b> {product.productName}</div>
                                    <div className="card-title"><b>product id:</b> {product.productId}</div>
                                    <div className='card-title'><b>product price:</b> {product.price}</div>
                                    <div className='card-title'><b>product quantity:</b> {product.quantity}</div>
                                    <br />
                                </div>
                            )
                        }
                        )
                    ) : (<div className="center">No products to show</div>)
                    }
                 <div className="card-title"><b>Order Status:</b> {this.state.status}</div>
                 <button className="waves-effect waves-light btn" disabled={(this.state.status==="Delivered")||(this.state.status==="Cancelled")} onClick={this.cancelOrder}><i className="material-icons right">cancel</i>Cancel Order</button>
                </div>
            </div>

        ) : (
                <div className='center'>Loading order...</div>
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

export default SingleOrder1;