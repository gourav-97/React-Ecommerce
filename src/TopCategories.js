import React,{Component} from 'react';
import * as constant from './constant'
import {Link} from 'react-router-dom';
import axios from 'axios';
import './Category.css';
class TopCategories extends Component{
    state={
        topCategories:{ },
        statusCode:null
    }

    componentDidMount(){
        axios.get(constant.ms1+'/displayByTopScore')
            .then(res =>{
                console.log(res);
                if((res.data.statusCode)===200){
                    this.setState({
                        topCategories:res.data.responseData
                    })    
                }
                else{
                    alert(res.data.message);
                }
            })
    }

    render(){
    const {topCategories}=this.state;
    console.log(topCategories)
    const topCategoriesList = topCategories.length ?(
            topCategories.map(category =>{
                return(
                    <div className="category card" key={category.categoryId} style={{width:"48%", height:"50%", margin:"5px"}}>
                        <Link to={{pathname:'/categories/'+category.categoryId+'/products',state:{url:category.picURL}}}>
                        <div className="card-content">  
                        <center><img className="card-image" src={category.picURL} style={{width:"200px", height:"200px"}} alt=""/></center> 
                            <span className="card-title">{category.categoryName}</span>
                            <p> &nbsp;  &nbsp;  &nbsp; {category.desc}</p>
                        </div>
                        </Link>
                    </div>
                )
            })
    ):(
        <div className="center">
            
            <img alt="Sorry..Loading" src="https://i.imgur.com/T3Ht7S3.gif" width="120"></img>
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