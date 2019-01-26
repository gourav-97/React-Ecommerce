import React,{Component} from  'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class SubCategory extends Component{
    state={
        CategoryName:"",
        SubCategories:{},
        ready:false
    }
    componentDidMount(){
        const id = this.props.match.params.categoryId;
        axios.get('http://localhost:8080/categories/'+id)
        .then(res=>{
            console.log(res.data.responseData)
            console.log(res.data.statusCode)
            if(res.data.statusCode==200){
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
                alert(res.data.message);
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
                    <div className="subcategory card" key={subcategory.categoryId}>
                        <Link to={'/subcat/'+this.props.match.params.categoryId+'/'+subcategory.categoryId}>
                            <div className="card-content">
                                <span className="card-name">{subcategory.categoryName}</span> 
                                <p>{subcategory.desc}</p>
                                <img className="card-image" src={subcategory.picURL} alt=""/>
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
                    <h4 className="center">{this.state.CategoryName}</h4>
                {subcategoryList}
            </div>
        )
    }
}
export default SubCategory;