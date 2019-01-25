import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './Category.css';
class Category extends Component{
    state={
        categories:{ },
        statusCode:null
    }

    componentDidMount(){
        axios.get('http://localhost:8080/categories')
            .then(res =>{
                console.log(res);
                if((res.data.statusCode)==200){
                    this.setState({
                        categories:res.data.responseData
                    })    
                }
                else{
                    alert(res.data.message);
                }
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
                        <img className="card-image" src={category.picURL} alt=""/>
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