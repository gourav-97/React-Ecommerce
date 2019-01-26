import React, { Component } from 'react';
import {BrowserRouter,Route } from 'react-router-dom'
import Contact from './Contact';
import About from './About';
import SubCategory from './SubCategory';
import ProductsPage from './ProductsPage';
import PopularProductsPage from './PopularProductsPage';
import Product from './Product';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import OrderHistory from './OrderHistory';
import Checkout from './Checkout';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
        <Header/>
          <Route exact path="/" component={Home}/>
          <Route path='/about' component ={About}/>
          <Route path='/contact' component={Contact}/>
          <Route path='/cat/:categoryId' component={SubCategory}/>
          {/* <Route path='/subcat/:categoryId' component={TopProductsPage}/> */}
          <Route path='/subcat/:categoryId/:subcategoryId' component={ProductsPage}/>
          <Route path='/categories/:subCategoryId/products' component={PopularProductsPage} />
          <Route exact path='/product/:productId' component={Product}/> 
          <Route exact path='/orderHistory' component={OrderHistory}/> 
          <Route exact path='/checkout' component={Checkout}/> 
      <Footer/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
