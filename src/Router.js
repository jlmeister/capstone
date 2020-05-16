import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { Dashboard, Home, Login, NotFound, Register } from "./components";
import { checkAuth } from "./auth";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => checkAuth() ? (
      <Component {...props} />
    ) : (
        <Redirect to="/login" />
      )}
    />
  )
}

const Router = () => {
  return (
    <Switch>
      <ProtectedRoute exact path='/dashboard' component={Dashboard}/>
      <Route exact path='/login' component={Login}/>
      <Route exact path='/register' component={Register}/>
      <Route exact path='/' component={Home} />
      <Route component={NotFound} />
    </Switch>
  )
}

export default Router