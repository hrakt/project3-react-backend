import React,{Component} from 'react';
import {withRouter} from "react-router-dom";
import '../Login/Register'
import * as routes from "../constants/routes"


class Edit extends Component{
    state={
        logged:false,
        userObj: {},
        userID:this.props.userID,
        updateStatus:false
    };
    onSubmit = async (e)=>{
        e.preventDefault();
        console.log("updating it")
        const updateResponse = await fetch ('/users/update ',{
            method:"PUT",
            credentials:"include",
            body: JSON.stringify(this.state),
            headers:{
                "Content-Type":'application/json'
            }
        });
        const parsedLogin = await updateResponse.json()
        console.log(parsedLogin,"this is parsedLogin")
        if (parsedLogin.success){
            this.props.loggedIn(parsedLogin.data._id);
        }
        await this.setState({updateStatus:parsedLogin.success});
        this.props.history.push(routes.MYPROFILE);
    }
    changeHandler = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log(this.state);
    };

    redirectToHome = ()=>{
       
    }
   
    componentDidMount = async() =>{
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
        

    }
  
    render(){
        console.log(this.state.userID, "this is userID insdie of edi")
        return(
        <form onSubmit={this.onSubmit}>
            <div className="registerPage">
                <h1>Edit Account </h1>
            <div className="registerContainer">
            <div>
                <input type="text" name="email" placeholder="Email"  onChange={this.changeHandler}/>
            <br/>
            </div>
            <div>
                <input type="text" name="firstName"  placeholder="First Name" onChange={this.changeHandler}/>
            </div>
           
            <div>
                <input type="text" name="lastName" placeholder="Last Name"  onChange={this.changeHandler}/>
            </div>
            
            <div>
                <input type="password" name="password" placeholder="Password"  onChange={this.changeHandler}/>
            </div>
                <input type='Submit' value= "Update"/>

            </div>
           
            
            </div>
            
        </form>

        );
        }
}

export default withRouter(Edit);