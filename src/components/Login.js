import React, { useState } from 'react';
import { Button, TextField } from "@material-ui/core";
import { checkAuth } from '../auth';
import { Redirect } from 'react-router-dom';

const Login = ({ history }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = e => {
    e.preventDefault()
    document.cookie = "loggedIn=true;max-age=600";
    history.push('/')
  }

  // on submit, send a POST request to Express API for authentication
  // on successful response, redirect to Dashboard
  // on unsuccessful response, tell user to try again.

  return (
    checkAuth() ? (
      <Redirect to='/' />
    ) : (
    <form onSubmit={handleSubmit}>
      <TextField    
        type='text'
        onChange={e => setUsername(e.target.value)}
        value={username} />
      <TextField
        type='text'
        onChange={e => setPassword(e.target.value)}
        value={password} />
      <Button type='submit'>Submit</Button>
    </form>
    )
  )
}

export default Login