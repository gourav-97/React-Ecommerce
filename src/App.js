import React, { Component } from 'react';
import Navbar from './Navbar';
import {BrowserRouter,Route } from 'react-router-dom'
import Contact from './Contact';
import About from './About';
import Category from './Category';
import SubCategory from './SubCategory';
import Products from './Products';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          {/* <Route path="/" component={Navbar}/> */}
          <Navbar/>
          <Route path='/category' component={Category}/>
          <Route path='/products' component={Products}/>
          <Route path='/category/about' component ={About}/>
          <Route path='/contact' component={Contact}/>
          <Route path='/cat/:categoryId' component={SubCategory}/>
          <Route path='/subcat/:categoryId/:subcategoryId' component={Products}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
