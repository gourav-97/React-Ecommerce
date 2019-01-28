import React, { Component } from "react";
import { Button, ButtonGroup, Container, Table } from "reactstrap";
// import AppNavbar from "./AppNavbar";
import axios from 'axios';
import * as constant from './constant';

class Cart extends Component {
  emptyCart = {
    item: [],
    amountPayable: ""
  };
  constructor(props) {
    super(props);
    this.state = {
      // item: this.emptyItem,
      count:"",
      newCart: this.emptyCart
    };
    this.state = { newCart: [], isLoading: true };
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.setState({count:[]})
    fetch(constant.ms2 + "/cart")
      .then(response => response.json())
      .then(data => this.setState({ newCart: data, count : 1, isLoading: false }));
  }

  async remove(id,price) {
    console.log("In delete method " + id);
    // const{newCart,cartItemList = [newCart]} = this.state;
    await fetch(constant.ms2 + `/cart/removeCartItem/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(() => {
      // console.log("anuj");
      // console.log(this.state.cartItemList[0].item.productId);
      let updatedCart = [...this.state.newCart.cartItemList].filter(
        cartItemList => cartItemList.item.productId !== id
      );
      let updated = this.state.newCart
      updated.cartItemList = updatedCart;
      updated.amountPayable = updated.amountPayable - price;
      console.log("PRice = "+price);
      console.log("NEW CART + " + JSON.stringify(updated))
      console.log("Updated cart is = " + JSON.stringify(updatedCart));
      this.setState({ newCart : updated});
    });
  }

  async placeOrder(cartList,newCart){
    console.log(this.state.newCart);

    axios.post(constant.ms2 + '/placeOrder',
           this.state.newCart,
       {'Content-Type':'application/json'}).then(res=>{
            console.log("REsponse = "+res)
            console.log(res.data.statusCode)
            if(res.data.statusCode===200){
                console.log(res.data.responseData)
                this.props.history.push({
                  pathname:"/checkout",
                  state:{
                    responseData: res.data.responseData
                  }
                })
            }
            else{
                window.location.reload();
                alert(res.data.message);
            }
         }).catch(error=>{
            console.log(error.response)
            if(error.response)
                console.log(error.response);
        })
  }


  async removeAll() {
    // console.log("In delete method " + id);
    await fetch(constant.ms2 + `/cart/emptyCart`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(() => {
      let updatedCart = [];
      // this.setState({
      //   newCart:updatedCart
      // })
    });
    window.location.reload();
  }

  increment(item,newCart) {
    console.log("INCREMENT BEFORE = "+item.quantity)
    this.setState({
      count: item.quantity + 1
    });
    item.quantity = item.quantity + 1
    newCart.amountPayable = newCart.amountPayable + item.price
    axios.post(constant.ms2 + '/cart/updateQuantity',
           item,
       {'Content-Type':'application/json'}).then(res=>{
            console.log("Status = "+res.data.statusCode)
            if(res.data.statusCode===200){
                console.log("Data = "+res.data.responseData)
            }
            else{
                window.location.reload();
                alert(res.data.message);
            }
         }).catch(error=>{
            console.log(error.response)
            if(error.response)
                console.log(error.response);
        })
    this.setState({
      newCart:newCart
    })
    console.log("INCREMENT = "+this.state.count)
    
  };
  
  decrement(item,newCart) {
    if(item.quantity==1)
    {
      this.remove(item.productId,item.price);
      // window.location.reload();
    }
    else{
    this.setState({
      count: item.quantity - 1
    });
    item.quantity = item.quantity - 1
    newCart.amountPayable = newCart.amountPayable - item.price
    axios.post(constant.ms2 + '/cart/updateQuantity',
           item,
       {'Content-Type':'application/json'}).then(res=>{
            console.log("Status = "+res.data.statusCode)
            if(res.data.statusCode===200){
                console.log("Data = "+res.data.responseData)
            }
            else{
                window.location.reload();
                alert(res.data.message);
            }
         }).catch(error=>{
            console.log(error.response)
            if(error.response)
                console.log(error.response);
        })
    this.setState({
      newCart:newCart
    })
  }
  };


  render() {
    console.log("In render");
    const { newCart, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }
    console.log("In render before cartList + ");
    const cartList = newCart.cartItemList.map(cartItem => {
      return (
        <tr key={cartItem.item.id}>
          {console.log("Name = " + cartItem.item.price)}
          <td style={{ whiteSpace: "nowrap" }}>{cartItem.item.productName}</td>
          {/* <td>{cartItem.item.productName}</td> */}
          <td>{cartItem.item.price}</td>
          <td>
          <div>
       <button onClick={(e) => this.increment(cartItem.item,newCart)}>+</button>
       {cartItem.item.quantity}
        <button disabled = {cartItem.item.quantity==1} onClick={(e) => this.decrement(cartItem.item,newCart)}>-</button>
      </div>
            

          </td>
          <td>{cartItem.item.price * cartItem.item.quantity}</td>
          {/* <td>{cartItem.item.description}</td> */}
          {console.log("Cart  = " + newCart.amountPayable)}
          {/* <td>{newCart.amountPayable}</td> */}
          <td>
            {/* {console.log(cart.item.id)} */}
            <ButtonGroup>
              <Button
                size="sm"
                color="danger"
                onClick={() => this.remove(cartItem.item.productId,cartItem.item.price*cartItem.item.quantity)}
              >
                Delete
              </Button>

              {/* <Button size="sm" color="primary" tag={Link} to={"/groups/" + group.id}>Edit</Button> */}
              {/* <Button size=/"sm" color="danger" onClick={() => this.remove(cart.item.id)}>Delete</Button> */}
              {/* <Button
                size="sm"
                color="success"
                type="submit"
                onClick={() => this.removeAll()}
              >
                empty cart
              </Button> */}
            </ButtonGroup>
          </td>
          {/* <td>{newCart.amountPayable}</td> */}
        </tr>
      );
    });

    console.log("In render before return");
    return (
      <div>
        {/* <AppNavbar /> */}
        <Container fluid>
          {console.log("In table")}
          <h2>
            <center>My Cart</center>
          </h2>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="20%">Name</th>
                <th width="10%">Price</th>
                <th width="20%">Quantity</th>
                {/* <th>Description</th> */}
                <th width = "20%">AmountPayable</th>
                <th width="10%">Actions</th>
              </tr>
            </thead>
            <tbody>{cartList}</tbody>
            <tr>
              <th width="20%">Total Price</th>
              <th width="20%" />
              <th width="20%" />
              <th width="20%">{newCart.amountPayable}</th>
              <th>
              <Button size="sm" disabled={newCart.cartItemList.length==0} color="success" type="submit" onClick={() => this.removeAll()}>
                Empty Cart
              </Button>
              </th>
            </tr>
            
            <tr>
            <div className="float-left">
              {/* {console.log("NEW CART = "+newCart)} */}
            <Button color="success" disabled={newCart.cartItemList.length==0} onClick={() => this.placeOrder(cartList,newCart)}> Place order </Button>
          </div>
              
              </tr>
          </Table>
        </Container>
      </div>
    );
  }
}

export default Cart;