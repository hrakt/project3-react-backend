import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';


import Login from './Login/Login'
import Register from './Login/Register'
import Search from './component/Search'
import Profile from './component/Profile'
import Edit from './component/Edit'
import NavBar from './component/Navbar';
import Home from './component/Home';
import * as routes from './constants/routes';



class App extends Component  {
  state={
    logged: false,
    userID: null
  }

  checkedLogged= (userID)=>{
    this.setState({
      logged:true,
      userID:userID
    })
  }
  
  render(){
    return (
      <div className="App">
        <NavBar logStat={this.state.logged} logOut={() => this.setState({logged: !this.state.logged})}/>
        <Switch>
          <Route exact path={routes.ROOT} render={()  =><Home />} />
          <Route exact path={routes.HOME} render={()  =><Home />} />
          <Route exact path={routes.USERS} render={()  =><div>USERS</div>} />
          <Route exact path={routes.SEARCH} render={()  =><Search logged={this.state.logged} userID={this.state.userID} />} />
          <Route exact path={routes.MYPROFILE} render={() =><Profile userID={this.state.userID} logged={this.state.logged}/>} />
          <Route exact path={routes.LOGIN} render={()  =><Login loggedIn={this.checkedLogged} logged={this.state.logged}/>} />
          <Route exact path={routes.EDIT} render={() => <Edit userID={this.state.userID} loggedIn={this.checkedLogged} />} />
          <Route exact path={routes.REGISTER} render={()  =><Register/>} />
          <Route render={()=><div>NOT FOUND</div>} />
        </Switch>
      </div>
    );
  }
}

export default App;
