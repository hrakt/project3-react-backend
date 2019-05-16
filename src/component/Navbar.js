import React from 'react';
import {NavLink} from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, Button, NavItem } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import * as router from '../constants/routes';
import './NavBar.css'
import styled from 'styled-components'


const NavBar = (props) =>
    <div >
            <Navbar  className="navBar" variant="flat">
            <Navbar.Brand>MyApp</Navbar.Brand>
            <NavItem>
                <NavLink to={router.HOME} activeClassName='active'>HOME </NavLink>
            </NavItem>
            <NavItem>
                <NavLink to={router.USERS} activeClassName='active'>USERS </NavLink>
            </NavItem>
            <NavItem>
                <NavLink to={router.SEARCH} activeClassName='active'>SEARCH </NavLink>
            </NavItem>
            <NavItem>
                <NavLink to={router.ROOT} exact activeClassName='active'>ROOT </NavLink>
            </NavItem>
            {props.logStat
            
            ?   <NavItem>
                    <NavLink onClick={props.logOut}>LOGOUT</NavLink>
                </NavItem>
            : <NavItem>
                    <NavLink to={router.LOGIN} exact activeClassName='active'>LOGIN</NavLink>
                </NavItem>
            }
            </Navbar>


    </div>

export default NavBar