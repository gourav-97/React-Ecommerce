import React,{Component} from  'react';
import * as constant from './constant'
import {Link} from 'react-router-dom';
import axios from 'axios';
import './SubCategory.css';

class SubCategory extends Component{
    state={
        CategoryName:"",
        SubCategories:{},
        ready:false
    }
    componentDidMount(){
        const id = this.props.match.params.categoryId;
        axios.get(constant.ms1+'/categories/'+id)
        .then(res=>{
            console.log(res.data.responseData)
            console.log(res.data.statusCode)
            if(res.data.statusCode===200){
                console.log(res.data.responseData)
                console.log(this.props.location.state)
                let name = this.props.location.state.categoryName;
                this.setState({
                    SubCategories: res.data.responseData,
                    categoryId:id,
                    CategoryName:name
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
            console.log(error.response)
            // if(error.response)
            //     console.log(error.response);
        })
    }
    render(){
        console.log(this.state.SubCategories)
        const subcategoryList = this.state.SubCategories.length ? (
            this.state.SubCategories.map(subcategory =>{
                return (
                    <div className="subcategory card" key={subcategory.categoryId} style={{width:"48%", height:"50%", margin:"5px"}}>
                        <Link to={'/subcat/'+this.props.match.params.categoryId+'/'+subcategory.categoryId}>
                            <div className="card-content">
                                <span className="card-name">{subcategory.categoryName}</span> 
                                <p>{subcategory.desc}</p>
                                <center><img className="card-image" style={{width:"200px", height:"200px"}} src={subcategory.picURL} alt=""/></center>
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
                    <h4 className="center">{this.state.CategoryName}</h4>
                {subcategoryList}
            </div>
        )
    }
}
export default SubCategory;