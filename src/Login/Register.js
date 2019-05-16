import React,{Component} from 'react';
import { Link} from "react-router-dom";
import './Register.css'


class Register extends Component{
    state={
        username:'',
        password:'',
        firstName:'',
        lastName:'',
        logged:false
    };
    changeHandler = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log(this.state);
    };
    onSubmit = async (e)=>{
        console.log("hey")
        console.log(this.state,'this.state before sending it out')
        e.preventDefault();
        const registerResponse = await fetch ('/users/register',{
            method:"POST",
            credentials:"include",
            body: JSON.stringify(this.state),
            headers:{
                "Content-Type":'application/json'
            }
        });
        const parsedResponse = await registerResponse.json();
        if(parsedResponse.success){
            this.setState({
                logged:true
            })
    }   
    }
    render(){
        return(
        <form onSubmit={this.onSubmit}>
            <div className="registerPage">
                <h1>Create Account </h1>
            <div className="registerContainer">
            <div>
                <input type="text" name="username" placeholder="Email" onChange={this.changeHandler}/>
            <br/>
            </div>
            <div>
                <input type="text" name="firstName"  placeholder="First Name" onChange={this.changeHandler}/>
            </div>
           
            <div>
                <input type="text" name="lastName" placeholder="Last Name" onChange={this.changeHandler}/>
            </div>
            
            <div>
                <input type="password" name="password" placeholder="Password" onChange={this.changeHandler}/>
            </div>
                <input type='Submit' value= "Register"/>

            </div>
            <div>
                <p>Already registered? <Link to='/login'>Login Here!</Link></p>
            </div>
            
            </div>
            
        </form>

        );
        }
}

export default Register;