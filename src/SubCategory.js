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
        // let catid = this.props.match.params.categoryId;
        // console.log(id)
        axios.get('/categories/'+id)
        .then(res=>{
            console.log(res);
                let name = this.props.location.state.categoryName;
                this.setState({
                    SubCategories: res.data,
                    categoryId:id,
                    CategoryName:name
                })
            })
        .catch(error=>{
            if(error.response)
                console.log(error.response);
        })
    }
    render(){
        const subcategoryList = this.state.SubCategories.length ? (
            this.state.SubCategories.map(subcategory =>{
                return (
                    <div className="subcategory card" key={subcategory.categoryId}>
                        <Link to={'/subcat/'+this.props.match.params.categoryId+'/'+subcategory.categoryId}>
                        <div className="card-content">
                            <span className="card-name">{subcategory.categoryName}</span> 
                            <p>{subcategory.desc}</p>
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