import React, { useState, useEffect } from 'react';
import { client, Lookup } from "../smartystreets";
import axios from "axios";

const AddressLookup = ({ submitForConfirmation }) => {
  const [street1, setStreet1] = useState('')
  const [street2, setStreet2] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [results, setResults] = useState([])
  const [shouldSearch, setShouldSearch] = useState(false)

  useEffect(() => {
    const debouncedSearch = setTimeout(() => {
      if (shouldSearch === false) return;
      if (street1.length >= 3) {
        client.send(new Lookup(street1))
          .then(response => setResults([...response.result]))
          .catch(err => console.log(err))
      }
      else
        setResults([])
    }, 200)
    return () => clearTimeout(debouncedSearch)
  }, [street1, shouldSearch])

  const handleSubmit = e => {
    e.preventDefault()
    axios({
      method: 'POST',
      url: 'http://localhost:4000/api/address/verify',
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
    <div style={{ width: '300px', margin: '150px auto' }}>
      <form onSubmit={handleSubmit}>
        <label>street 1
          <input required
            value={street1}
            onChange={handleAutoComplete} />
          <br />
        </label>
        {
          results.length > 0 && (
            <ul style={{ width: '100%' }}>
              {results.map((result, index) => {
                const setAddress = () => {
                  setStreet1(result.streetLine)
                  setCity(result.city)
                  setState(result.state)
                  setShouldSearch(false)
                  setResults([])
                }
                return (
                  <li key={index} onClick={setAddress}>
                    {result.text}
                  </li>
                )
              })}
            </ul>
          )
        }
        <label>Apt/Suite
          <input value={street2} onChange={e => setStreet2(e.target.value)} /> <br />
        </label>
        <label>city
          <input required value={city} onChange={e => setCity(e.target.value)} /> <br />
        </label>
        <label>state
          <input required value={state} onChange={e => setState(e.target.value)} /> <br />
        </label>
        <button>submit</button>
      </form>
    </div>
  )
}

export default AddressLookup