import React,{Component} from 'react';
import {Redirect, Link} from "react-router-dom";
import Button from 'react-bootstrap/Button'
import styled from 'styled-components'
import "./Home.css";



const Text = styled.p`
    color: blue;
    display:flex;
    align-self:center;
`
const LandingPage = styled.div`
    background-color: aqua;
    height: 100vh;
    flex-direction: column;
`



class Home extends Component{
    render(){
        return(
            <section>
                <div className="landingPage">
                    <div className="textDiv">
                        <p>Plan your journey</p>
                        <p className="landingText">Find amazing places</p> 
                        <p className="landingText">Take fascinating detours…</p>
                    </div>         
                    <div className="buttonDiv">
                        <Button variant="primary" size="lg" color="red" className="customButton">Start Planning</Button>
                    </div>           
                </div>
                {/* <div className="bottomPart">
                    <p>Destinations</p>
                    <div className="firstBox">
                        <h3>LA</h3>
                    </div>
                    <div className="secondBox">
                        <h3>NYC</h3>
                    </div>
                    <div className="thirdBox">
                        <h3>CHI</h3>
                    </div>
                </div> */}
            </section>
            

        )
    }
}

export default Home;