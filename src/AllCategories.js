import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import * as constant from './constant'
import './Category.css';
class TopCategories extends Component{
    state={
        allCategories:{ },
        statusCode:null
    }

    componentDidMount(){
        axios.get(constant.ms1+'/categories')
            .then(res =>{
                console.log(res);
                if((res.data.statusCode)==200){
                    this.setState({
                        allCategories:res.data.responseData
                    })    
                }
                else{
                    alert(res.data.message);
                }
            })
    }

    render(){
    const {allCategories}=this.state;
    console.log(allCategories)
    const allCategoriesList = allCategories.length ?(
            allCategoriesList.map(category =>{
                return(
                    <div className="category card" key={category.categoryId}>
                        <Link to={{pathname:'/category/'+category.categoryId,state:{categoryName:category.categoryName} }}>
                        <div className="card-content">  
                            <span className="card-name">Category Name: {category.categoryName}</span>
                            <p>Description: {category.desc}</p>
                        </div>
                        {} <img className="card-image" src={category.picURL} alt=""/> }
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
            <div className="container" >
            <h4 className="center">Top Categories</h4>
            {topCategoriesList}            
            </div>  
    )}
}

export default TopCategories;