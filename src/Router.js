import React from 'react';
import { Route, Switch } from "react-router-dom";
import { About, Companies, Dashboard, Home, Login, NotFound } from "./components";

const Router = () => {
  return (
    <Switch>
      <Route exact path='/companies' component={Companies}/>
      <Route exact path='/dashboard' component={Dashboard}/>
      <Route exact path='/login' component={Login}/>
      <Route exact path='/about' component={About}/>
      <Route exact path='/' component={Home} />
      <Route component={NotFound} />
    </Switch>
  )
}

export default Router