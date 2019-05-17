import React,{Component} from 'react';
import {Redirect, Link,NavLink} from "react-router-dom";
import Button from 'react-bootstrap/Button'
import styled from 'styled-components'
import "./Home.css";
import { async } from 'q';
import * as routes from '../constants/routes';




class Profile extends Component{
    state={
        userID:"",
        userObj:{},
        logged:false
    }
    getUser = async()=>{
        
        await this.setState({
            userID:this.props.userID
        })
        
        const userResponse = await fetch (`/users/profile`,{
            method:"POST",
            credentials:"include",
            body: JSON.stringify(this.state),
            headers:{
                "Content-Type":'application/json'
            }
        });
        const parsedResponse = await userResponse.json();
        const {data} = parsedResponse;
        await this.setState({userObj:data})
        console.log(parsedResponse)
        
    }
    deleteUser = async() =>{
        const deleteResponse = await fetch ('/users/delete',{
            method:"POST",
            credentials:"include",
            body: JSON.stringify(this.state),
            headers:{
                "Content-Type":"application/json"
            }
        });
        console.log("delete was successfull")
        await this.setState({logged:false},{userObj:{}},{userID:""})
    }
    componentDidMount(){
        this.getUser();
    }
    render(){
        return(
        this.props.logged
        ?<div>
        <h1>Hey, {this.state.userObj.firstName}</h1>
        <Link to={routes.EDIT}><button >Edit Profile</button></Link>
        <Link to={routes.HOME}><button onClick={this.deleteUser}>Delete User</button></Link>
    </div> 
        :<p>Please login</p>
            
        )
    }
}

export default Profile;