import React from 'react';
import { Link, useHistory } from "react-router-dom";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import { checkAuth } from "../auth";

const Navigation = () => {
  const history = useHistory()
  const logOut = () => {
    window.sessionStorage.clear()
    history.push('/')
  }

  return (
    <AppBar position='relative'>
      <Toolbar>
        <Typography variant='h6' style={{ flexGrow: 1 }}>
          AddressIt
        </Typography>
        {
          checkAuth() ? (
            <>
              <Button component={Link} to='/dashboard' color='inherit'>Dashboard</Button>
              <Button color='inherit' onClick={logOut}>Sign Out</Button>
            </>
          ) : ( history.location.pathname !== '/login' &&
            <Button component={Link} to='/login' color='inherit'>Sign In</Button>
          )
        }
      </Toolbar>
    </AppBar>
  )
}

export default Navigation