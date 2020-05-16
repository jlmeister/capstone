import React, { useState, useEffect } from 'react';
import { client, Lookup } from "../smartystreets";
import axios from "axios";
import { Button, TextField, ListItem, List } from "@material-ui/core";
import { pathName } from "../pathname";

const AddressLookup = ({ goToDashboard, submitForConfirmation }) => {
  const [street1, setStreet1] = useState('')
  const [street2, setStreet2] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [shouldSearch, setShouldSearch] = useState(false)

  useEffect(() => {
    const debouncedSearch = setTimeout(() => {
      if (shouldSearch === false) return;
      if (street1.length >= 3) {
        client.send(new Lookup(street1))
          .then(response => setSuggestions([...response.result]))
          .catch(err => console.log(err))
      }
      else
        setSuggestions([])
    }, 200)
    return () => clearTimeout(debouncedSearch)
  }, [street1, shouldSearch])

  const handleSubmit = e => {
    e.preventDefault()
    axios({
      method: 'POST',
      url: `${pathName}/api/addresses/verify`,
      headers: {
        'content-type': 'application/json'
      },
      data: {
        street: street1,
        secondary: street2,
        lastLine: `${city} ${state}`
      }
    })
      .then(res => res.data.lookups.map(lookup => lookup.result[0]))
      .then(address => {
        if (address.length > 0) {
          console.log('address ', address[0])
          submitForConfirmation(address[0])
        }
        else
          console.log('invalid address')
      })
      .catch(err => console.log(err))
  }
  
  const handleAutoComplete = e => {
    setStreet1(e.target.value)
    setShouldSearch(true)
  }

  return (
    <div style={{ width: '500px', margin: '150px auto' }}>
      <form style={{width: '100%'}} onSubmit={handleSubmit}>
          <TextField
            label='Street 1'
            required
            fullWidth
            value={street1}
            onChange={handleAutoComplete} />
          <br />
        {
          suggestions.length > 0 && (
            <List style={{ width: '100%', listStyle: 'none', border: '2px solid #ccc', borderRadius: '5px' }}>
              {suggestions.map((suggestion, index) => {
                const setAddress = () => {
                  setStreet1(suggestion.streetLine)
                  setCity(suggestion.city)
                  setState(suggestion.state)
                  setShouldSearch(false)
                  setSuggestions([])
                }
                return (
                  <ListItem style={{ width: '100%' }} button key={index} onClick={setAddress}>
                    {suggestion.text}
                  </ListItem>
                )
              })}
            </List>
          )
        }
        <TextField fullWidth label='Apt/Suite' value={street2} onChange={e => setStreet2(e.target.value)} /> <br />
        <TextField fullWidth label='City' required value={city} onChange={e => setCity(e.target.value)} /> <br />
        <TextField fullWidth label='State' required value={state} style={{ marginBottom: '2rem' }} onChange={e => setState(e.target.value)} /> <br />
        <Button variant='contained' style={{ marginRight: '20px' }} onClick={() => goToDashboard()}>Cancel</Button>
        <Button variant='contained' onClick={handleSubmit} color='primary'>Submit</Button>
      </form>
    </div>
  )
}

export default AddressLookup