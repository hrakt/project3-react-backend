import React,{Component} from 'react';
import Flights from './Flights';
import {Redirect, Link} from "react-router-dom";
import { ClipLoader } from 'react-spinners'


class Search extends Component{
    state={
        origin:'',
        destination:'',
        startDate:'',
        endDate:'',
        flights:{},
        searchStatus:false,
        searchInitiated:false
    };

    changeHandler= e =>{
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    onSubmit = async (e)=>{
        console.log(this.props.userID,'this is the userID')
        e.preventDefault();
        await this.setState({searchInitiated:true})
        console.log('hitting search in the front')
        const searchResponse = await fetch ('/api/search/',{
            method:"POST",
            credentials:"include",
            body: JSON.stringify(this.state),
            headers:{
                "Content-Type":"application/json"
            }
        });
        const parsedResponse = await searchResponse.json();
        await this.setState({
            flights: parsedResponse.flights,
            searchStatus: parsedResponse.success,
            searchInitiated:false
        })
    }
    render(){

        return(
            <div>
            <form onSubmit={this.onSubmit}>
                <input type="text" name="origin" placeholder="Enter your origin" onChange={this.changeHandler}/>
                <input type="text" name="destination" placeholder="Enter your destination" onChange={this.changeHandler}/>
                <input type="date" name="startDate" placeholder="Enter your origin" onChange={this.changeHandler}></input>
                <input type="date" name="endDate" onChange={this.changeHandler}></input><br/>
                <button onClick={()=>this.onSubmit} type="submit">SEARCH</button>
                <ClipLoader loading={this.state.searchInitiated}/>
            </form> 
                {this.state.searchStatus?
                <Flights flights={this.state.flights} userID={this.props.userID} logged={this.props.logged} /> :<p></p> }

            </div>  
                
            
        )
    }
}

export default Search;