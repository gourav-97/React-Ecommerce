import React, { Component } from 'react';
import {BrowserRouter,Route } from 'react-router-dom'
import Contact from './Contact';
import About from './About';
import Category from './Category';
import SubCategory from './SubCategory';
import Products from './Products';
import Header from './Header';
import Footer from './Footer';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
        {/* <Header/> */}
          <Route path="/" component={Header}/>
          <Route path='/category' component={Category}/>
          <Route path='/about' component ={About}/>
          <Route path='/contact' component={Contact}/>
          <Route path='/cat/:categoryId' component={SubCategory}/>
          <Route path='/subcat/:categoryId/:subcategoryId' component={Products}/> 
      <Footer/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
