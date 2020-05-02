import React, { useState, useEffect } from 'react';
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
  const [street1, setStreet1] = useState('')
  const [street2, setStreet2] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [results, setResults] = useState([])

  useEffect(() => {
    const debouncedSearch = setTimeout(() => {
      console.log(results)
      if (street1.length >= 3) {
        client.send(new Lookup(street1))
          .then(response => {
            console.log(response)
            setResults([...response.result])
          })
          .catch(err => console.log(err))
      }
      else
        setResults([])
    }, 200)
    return () => clearTimeout(debouncedSearch)
  }, [street1])

  const handleSubmit = e => {
    e.preventDefault()
    // setAddress({
    //   street1: street1,
    //   street2: street2,
    //   city: city,
    //   state: state
    // })
  }

  return (
    <div style={{ width: '300px', margin: '150px auto' }}>
      <form onSubmit={handleSubmit}>
        <label>street 1</label>
        <input label='street 1' onChange={e => setStreet1(e.target.value)} /> <br />
        {
          results.length > 0 && (
            <div style={{ width: '100%' }}>
              {results.map((result, index) => {
                return <p key={index}>{result.text}</p>
              })}
            </div>
          )
        }
        <label>street 2</label>
        <input label='street 2' onChange={e => setStreet2(e.target.value)} /> <br />
        <label>city</label>
        <input label='city' onChange={e => setCity(e.target.value)} /> <br />
        <label>state</label>
        <input label='state' onChange={e => setState(e.target.value)} /> <br />
        <button>submit</button>
      </form>
    </div>
  )
}

export default Dashboard