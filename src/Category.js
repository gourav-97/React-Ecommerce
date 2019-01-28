import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './Category.css';
import * as constant from './constant';
import './SubCategory.css';
class Category extends Component{
    state={
        categories:{ },
        statusCode:null
    }

    componentDidMount(){
        axios.get(constant.ms1+'/categories')
            .then(res =>{
                console.log(res);
                if((res.data.statusCode)===200){
                    this.setState({
                        categories:res.data.responseData
                    })    
                }
                else{
                    this.props.history.push({
                        pathname: "/error",
                        state:{
                            message:res.data.message
                        }
                    })            
                }
            }).catch(error=>{
                console.log(error)
            });
    }

    render(){
    const {categories}=this.state;
    console.log(categories)
    const categoriesList = categories.length ?(
            categories.map(category =>{
                return(
                    <div className="category card" key={category.categoryId} style={{width:"48%", height:"50%", margin:"5px"}}>
                        <Link to={{pathname:'/cat/'+category.categoryId,state:{categoryName:category.categoryName} }}>
                        <center><img className="card-image" style={{width:"200px", height:"200px"}} src={category.picURL} alt=""/></center>
                        <div className="card-content">  
                            <span className="card-title">{category.categoryName}</span>
                            <p> &nbsp;  &nbsp;  &nbsp; {category.desc}</p>
                        </div>
                        </Link>
                    </div>
                )
            })
    ):(
        <div className="center">
            
            <img src="https://i.imgur.com/T3Ht7S3.gif" width="120"></img>
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