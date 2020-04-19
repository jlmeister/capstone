import React from 'react';
import { Link, useHistory } from "react-router-dom";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import { checkAuth } from "../auth";

const Navigation = () => {
  const history = useHistory()
  const logOut = () => {
    document.cookie = 'loggedIn=;'
    history.replace(history.location.pathname)
  }

  return (
    <AppBar position='relative'>
      <Toolbar>
        <Typography variant='h6' style={{ flexGrow: 1 }}>
          I don't know the name of this app yet
        </Typography>
        <Button component={Link} to='/about' color='inherit'>About</Button>
        <Button component={Link} to='/companies' color='inherit'>Companies</Button>
        <Button component={Link} to='/dashboard' color='inherit'>Dashboard</Button>
        {
          checkAuth() ? (
            <Button color='inherit' onClick={logOut}>Sign Out</Button>
          ) : ( history.location.pathname !== '/login' &&
            <Button component={Link} to='/login' color='inherit'>Sign In</Button>
          )
        }
      </Toolbar>
    </AppBar>
  )
}

export default Navigation