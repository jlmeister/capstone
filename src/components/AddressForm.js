import React, { useState, useEffect, useRef } from 'react'
import { client, Lookup } from "../smartystreets";
import styles from './AddressForm.module.css'

const AddressLookup = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [shouldSearch, setShouldSearch] = useState(false)
  const [activeResult, setActiveResult] = useState(0)

  useEffect(() => {
    const debouncedSearch = setTimeout(() => {
      if (shouldSearch === false) return;
      if (query.length >= 3) {
        client.send(new Lookup(query))
          .then(response => setResults([...response.result]))
          .catch(err => console.log(err))
      }
      else
        setResults([])
    }, 200)
    return () => clearTimeout(debouncedSearch)
  }, [query])

  const handleInputChange = e => {
    setQuery(e.target.value)
    setShouldSearch(true)
    setActiveResult(0)
  }

  const handleKeyUp = e => {
    switch (e.keyCode) {
      case 13: // return key
        setShouldSearch(false)
        setActiveResult(0)
        setQuery(e.currentTarget.innerText)
        setResults([])
        return
      // case 38: // up arrow
      //   setActiveResult(activeResult => activeResult === 0 ? results.length - 1 : activeResult - 1)
      //   return
      // case 40: // down arrow
      //   setActiveResult(activeResult => activeResult === results.length - 1 ? 0 : activeResult + 1)
      //   return
      default: return
    }
  }

  const handleClick = e => {
    setShouldSearch(false)
    setActiveResult(0)
    setQuery(e.target.innerText)
    setResults([])
  }

  /**
   * @TODO
   * When you press Up or Down while maintaining focus on a suggestion
   *
   * decrement ActiveResult if Up
   * increment ActiveResult if Down
   * create a useEffect callback that will give focus to currently selected suggestion, or the autocomplete input if no results are given
   */

  return (
    <>
      <label>address
        <input value={query} onChange={handleInputChange} />
      </label>
      <ul role='listbox'>
        {
          results.map((result, index) => {
            return (
              <li
                role='option'
                tabIndex={0}
                key={index}
                onKeyUp={handleKeyUp}
                onClick={handleClick}
              >
                {result.text}
              </li>
            )
          })
        }
      </ul>
    </>
  )
}

const Address2Input = () => {
  return (
    <>
      <label> apt #
        <input />
      </label>
    </>
  )
}

const FullAddress = () => {
  return (
    <>
      <p>your address</p>
    </>
  )
}

const AddressForm = () => {
  const [step, setStep] = useState(1)
  const next = () => {
    if (step >= 2)
      setStep(3)
    else
      setStep(step + 1)
  }
  const previous = () => {
    if (step <= 1)
      setStep(1)
    else
      setStep(step - 1)
  }

  const NextButton = () => {
    if (step < 3) {
      return (
        <button onClick={next} type='button'>
          Next
        </button>
      )
    }
    else return null
  }

  const PreviousButton = () => {
    if (step !== 1) {
      return (
        <button onClick={previous} type='button'>
          Prev
        </button>
      )
    }
    else return null
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (step !== 3)
      return next()
    else console.log('submitted')
  }

  // autocomplete first step
  // on submitting second step, send GET request to Express API to verify address
  // on successful response, show verified US address on third step
  // on submitting third step, send POST request to Express API to insert address to database
  return (
    <form onSubmit={handleSubmit} style={{ margin: '200px auto 0', maxWidth: '500px' }}>
      {step === 1 && <AddressLookup />}
      {step === 2 && <Address2Input />}
      {step === 3 && <FullAddress />}
      <PreviousButton />
      <NextButton />
      {step === 3 && <button type='submit'>Submit</button>}
    </form>
  )
}

export default AddressForm