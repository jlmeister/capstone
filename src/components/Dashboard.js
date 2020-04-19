import React, { useState } from 'react';
import { client, Lookup } from "../smartystreets";

const Dashboard = (props) => {
  // hard coding stuff for now...

  /**
   * @TODO Add autocomplete to first input field.
   * Debounce API call so it submits a lookup request after user stops typing
   * Display up to five responses
   * Once chosen, take selected result contents and update state of other input fields
   * On Submit, send full address to back end API to process full address verification using SmartyStreets API
   */
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