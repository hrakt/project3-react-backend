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
        e.preventDefault();
        this.setState({searchInitiated:true})
        console.log('hitting search in the front')
        const searchResponse = await fetch ('/api/search/ ',{
            method:"POST",
            credentials:"include",
            body: JSON.stringify(this.state),
            headers:{
                "Content-Type":"application/json"
            }
        });
        const parsedResponse = await searchResponse.json();
        this.setState({
            flights: parsedResponse.flights,
            searchStatus: parsedResponse.success,
            searchInitiated:false
        })
    }
    render(){

        return(
            <form onSubmit={this.onSubmit}>
                <input type="text" name="origin" placeholder="Enter your origin" onChange={this.changeHandler}/>
                <input type="text" name="destination" placeholder="Enter your destination" onChange={this.changeHandler}/>
                <input type="date" name="startDate" placeholder="Enter your origin" onChange={this.changeHandler}></input>
                <input type="date" name="endDate" onChange={this.changeHandler}></input><br/>
                <button type="submit">SEARCH</button>
                <ClipLoader loading={this.state.searchInitiated}/>
                
                {this.state.searchStatus?
                <Flights flights={this.state.flights} /> :<p></p> }

                
                
            </form>
        )
    }
}

export default Search;