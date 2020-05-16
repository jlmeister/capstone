import React, { useState } from 'react';
import { Button, TextField } from "@material-ui/core";
import { checkAuth } from '../auth';
import { Redirect } from 'react-router-dom';
import axios from 'axios'

// on successful response, redirect to Dashboard
// on unsuccessful response, tell user to try again.

const Login = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = e => {
    e.preventDefault()
    axios({
      method: 'POST',
      url: 'http://localhost/api/user/login',
      headers: { 'content-type': 'application/json' },
      data: {
        email: email,
        password: password
      }
    })
      .then(res => {
        sessionStorage.setItem('loggedIn', true)
        sessionStorage.setItem('user', JSON.stringify({ email: res.data.email, id: res.data.id }))
        history.push('/dashboard')
      })
      .catch((err) => console.log(err))
  }
  
  return (
    checkAuth() ? (
      <Redirect to='/dashboard' />
    ) : (
    <form onSubmit={handleSubmit} style={{ width: '350px', margin: '150px auto' }}>
      <TextField    
        type='email'
        label='email'
        required
        fullWidth
        onChange={e => setEmail(e.target.value)}
        value={email}
      />
      <br/>
      <TextField
        type='password'
        label='password'
        required
        fullWidth
        style={{ marginBottom: '1.5rem' }}
        onChange={e => setPassword(e.target.value)}
        value={password}
      />
      <br/>
      <Button variant='contained' color='primary' fullWidth type='submit'>Submit</Button>
    </form>
    )
  )
}

export default Login