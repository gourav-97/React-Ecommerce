import React,{Component} from 'react';
import PopularProducts from './PopularProduct';
import TopCategories from './TopCategories';
import Category from './Category';
class Home extends Component{
    render(){
        return(
            <div>
                <TopCategories/>
                <PopularProducts/>
                <Category/>
            </div>
        )
    }
}
export default Home;