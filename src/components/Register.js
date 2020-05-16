import React, { useState } from 'react';
import { Button, TextField, Typography } from "@material-ui/core";
import axios from 'axios'
import { pathName } from "../pathname";

// on successful response, redirect to Dashboard
// on unsuccessful response, tell user to try again.

const Register = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = e => {
    e.preventDefault()
    axios({
      method: 'POST',
      url: `${pathName}/api/user/register`,
      headers: { 'content-type': 'application/json' },
      data: {
        email: email,
        password: password
      }
    })
      .then(res => history.push('/login'))
      .catch((err) => console.log(err))
  }

  return (
    <form onSubmit={handleSubmit} style={{ width: '350px', margin: '150px auto' }}>
      <Typography component='h1' variant='h5' align='center'>Register</Typography>
      <TextField
        type='email'
        label='email'
        required
        fullWidth
        onChange={e => setEmail(e.target.value)}
        value={email}
      />
      <br />
      <TextField
        type='password'
        label='password'
        required
        fullWidth
        style={{ marginBottom: '1.5rem' }}
        onChange={e => setPassword(e.target.value)}
        value={password}
      />
      <br />
      <Button variant='contained' color='primary' fullWidth type='submit'>Submit</Button>
    </form>
  )
}

export default Register