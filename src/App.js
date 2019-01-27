import React, { Component } from 'react';
import {BrowserRouter,Route } from 'react-router-dom'
import Contact from './Contact';
import About from './About';
import SubCategory from './SubCategory';
import Category from './Category';
import ProductsPage from './ProductsPage';
import PopularProductsPage from './PopularProductsPage';
import Product from './Product';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import OrderHistory from './OrderHistory';
import PaymentOption from './PaymentOption';
import Banking from './Banking';
import CardDetails from './CardDetails';
import BankOption from './BankOption';
import PaymentSuccess from './PaymentSuccess';
import Checkout from './Checkout';
import Cart from './Cart';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
        <Header/>
          <Route exact path="/" component={Home}/>
          <Route path='/about' component ={About}/>
          <Route path='/contact' component={Contact}/>
          <Route path='/category' component={Category}/>
          <Route path='/cat/:categoryId' component={SubCategory}/>
          {/* <Route path='/subcat/:categoryId' component={TopProductsPage}/> */}
          <Route path='/subcat/:categoryId/:subcategoryId' component={ProductsPage}/>
          <Route path='/categories/:subCategoryId/products' component={PopularProductsPage} />
          <Route exact path='/product/:productId' component={Product}/> 
          <Route exact path='/paymentOption' component={PaymentOption} />
          <Route exact path='/payment/:mode' component={Banking} />
          <Route path='/payment/:mode/details' component={CardDetails} />
          <Route path='/payment/netbanking/list_banks' component={BankOption} />
          <Route path='/payment/pay/status' component={PaymentSuccess} />
          <Route exact path='/orderHistory' component={OrderHistory}/> 
          <Route exact path='/checkout' component={Checkout}/> 
          <Route exact path='/cart' component={Cart}/>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
