import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Category extends Component{
    state={
        categories:{ }

    }

    componentDidMount(){
        axios.get('/categories')
            .then(res =>{
                console.log(res);
                this.setState({
                    categories:res.data
                })
            })
    }

    render(){
    const {categories}=this.state;
    console.log(categories)
    const categoriesList = categories.length ?(
            categories.map(category =>{
                return(
                    <div className="category card" key={category.categoryId}>
                        <Link to={{pathname:'/cat/'+category.categoryId,state:{categoryName:category.categoryName} }}>
                        <div className="card-content">  
                            <span className="card-name">Category Name: {category.categoryName}</span>
                            <p>Description: {category.desc}</p>
                        </div>
                        </Link>
                    </div>
                )
            })
    ):(
        <div className="center">
            No Categories To Show
        </div>
    )
    return(
        <div className="container">
            <h4 className="center">Categories</h4>
            {categoriesList}            
        </div>
    )}
}

export default Category;