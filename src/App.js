import React, { Component } from 'react';
import {BrowserRouter,Route } from 'react-router-dom'
import Contact from './Contact';
import About from './About';
import Category from './Category';
import SubCategory from './SubCategory';
import ProductsPage from './ProductsPage';
import Product from './Product';
import Header from './Header';
import Footer from './Footer';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
        {/* <Header/> */}
        <Header/>
          <Route exact path='/category' component={Category}/>
          <Route exact path='/about' component ={About}/>
          <Route exact path='/contact' component={Contact}/>
          <Route exact path='/cat/:categoryId' component={SubCategory}/>
          <Route exact path='/subcat/:categoryId/:subcategoryId' component={ProductsPage}/> 
          <Route exact path='/product/:productId' component={Product}/> 
        {/* <Footer/> */}
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
