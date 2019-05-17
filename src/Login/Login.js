import React,{Component} from 'react';
import {Redirect, Link,Route} from "react-router-dom";
import * as routes from "../constants/routes"
import './Login.css'

class Login extends Component{
    state={
        username:'',
        password:''
    };

    changeHandler= e =>{
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit = async (e)=>{
        e.preventDefault();
        console.log("whadipppp")
        const loginResponse = await fetch ('/users/login ',{
            method:"POST",
            credentials:"include",
            body: JSON.stringify(this.state),
            headers:{
                "Content-Type":'application/json'
            }
        });
        const parsedLogin = await loginResponse.json()
        console.log(parsedLogin,"this is parsedLogin")
        if (parsedLogin.success){
            this.props.loggedIn(parsedLogin.data._id);
        }
    }
    render(){
        return(
            this.props.logged
            ?    <Redirect to={routes.MYPROFILE}/>
            :    <form  onSubmit={this.onSubmit}>
                <div className="loginPage">
                <div className="loginContainer">
                <h1>Login</h1>
                <div className="input">
                    <input type="text" name="username" value={this.state.username} placeholder="username" onChange={this.changeHandler}/>
                </div>
                <div>
                    <input type="password" name ="password" placeholder="password" value={this.state.password} onChange=   {this.changeHandler}/>
                </div>
                <div className="submitSection">
                    <div>
                        <button type="submit">LOGIN
                        </button>
                    </div>
                    <div>
                         <p>Not registered? <Link to='/register'>Register Here!</Link></p>
                    </div>
                    
                </div>

                
                </div>
                </div>
               
                </form>

                    

        )
    }
}

export default Login;