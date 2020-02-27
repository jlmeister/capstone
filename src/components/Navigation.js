import React from 'react';
import { Link } from "react-router-dom";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";

const Navigation = (props) => {
  return (
    <AppBar position='relative'>
      <Toolbar>
        <Typography variant='h6'>
          I don't know the name of this app yet
        </Typography>
        <Button component={Link} to='/about'>About</Button>
        <Button component={Link} to='/companies'>Companies</Button>
        <Button component={Link} to='/dashboard'>Dashboard</Button>
        <Button component={Link} to='/login'>Sign In</Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navigation