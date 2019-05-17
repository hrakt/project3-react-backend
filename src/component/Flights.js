import React, { Component } from 'react';
import {Switch, Route,Link} from 'react-router-dom';
import * as routes from '../constants/routes';




class Flights extends Component  {
    state={
        logged:this.props.logged,
        userID:this.props.userID,
        flightData:null
    }
    addFlight = async(data) =>{
        console.log(this.props.userID,'this is userID')
        await this.setState({
         flightData:data   
        })
        const addFlight = await fetch ('/users/add',{
            method:"POST",
            credentials:"include",
            body: JSON.stringify(data),
            headers:{
                "Content-Type":'application/json'
            }
        });
        if(addFlight.success){
            await this.setState({
                flightData:null
            })
        }
    }
        
    handleClick=(e)=>{
        //this is to make the button disable through e.tar

    }
    render(){
        console.log(typeof this.props.flights)
        console.log(this.props.flights)
        const { data } = this.props.flights
        console.log(data,"this is the data")
        return(
            <div>
            {data.map((f, i)=>{
                const { arrival, aircraft, carrierCode, departure, operating, duration } = f.offerItems[0].services[0].segments[0].flightSegment
                const {total,totalTaxes} = f.offerItems[0].price
                return (
                    <div key={i}>
                        <h1>Flight:{operating.carrierCode + operating.number}</h1>
                        <h3>Deptarture: {departure.iataCode} from Terminal: {departure.terminal} at {departure.at} </h3>
                        <h3>Arrival: {arrival.iataCode} from Terminal: {arrival.terminal} at {arrival.at}</h3>
                        <h5>Carrier Code:{carrierCode}</h5>
                        <h5>Length:{duration}</h5>
                        <p>Price:{total},Taxes:{totalTaxes},Total{Number(total)+Number(totalTaxes)}}</p>
                        <button onClick={()=>this.addFlight(data[i])} >Add Flight</button>
                    </div>
                )
            })}
                

            </div>
        )
        
    }
        // return this.props.flights.data.forEach(offerItems => {
        //     offerItems.forEach(services =>
        //     console.log(services)
        // });((flight, index) => (
        //         <div key={index}>
        //       <h1>{flight.title}</h1>
        //       {item.content.map((c, i) => (
        //         <div key={i}>
        //           <img src={c.imageUrl} />
        //           <h3>{c.title}</h3>
        //           <h3>{c.description}</h3>
        //           <hr />
        //         </div>
        //       ))}
        //     </div>
    
    
}

export default Flights;
