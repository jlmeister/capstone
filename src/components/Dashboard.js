import React, { useState } from 'react';

const Dashboard = (props) => {
  const [address, setAddress] = useState({
    street1: '',
    street2: '',
    city: '',
    state: ''
  })
  const [street1, setStreet1] = useState('')
  const [street2, setStreet2] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    setAddress({
      street1: street1,
      street2: street2,
      city: city,
      state: state
    })
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>street 1</label>
        <input label='street 1' onChange={e => setStreet1(e.target.value)} /> <br/>
        <label>street 2</label>
        <input label='street 2' onChange={e => setStreet2(e.target.value)} /> <br />
        <label>city</label>
        <input label='city' onChange={e => setCity(e.target.value)} /> <br />
        <label>state</label>
        <input label='state' onChange={e => setState(e.target.value)} /> <br />
        <button>submit</button>
      </form>
      <h1>Address</h1>
      <p>{address.street1}</p>
      <p>{address.street2}</p>
      <p>{address.city}</p>
      <p>{address.state}</p>
    </div>
  )
}

export default Dashboard