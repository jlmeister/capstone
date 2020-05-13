import React, { useState } from 'react'
import AddressLookup from "./Dashboard";

const AddressConfirmation = ({ address, goBack }) => {
  /**
   * @description
   * when Confirm is clicked, send POST request to backend API to insert address into the database
   */
  return (
    <>
      <p>{address.deliveryLine1}</p>
      <p>{address.lastLine}</p>
      <button onClick={goBack}>Back</button>
      <button>Confirm</button>
    </>
  )
}

/**
 * @description
 * render the AddressLookup form
 * create a function that takes a state object to setAddressToBeConfirmed and setReadyForConfirmation
 * pass this function to AddressLookup as a prop
 * when AddressLookup has a validated address, trigger the function
 * 
 * @state ReadyForConfirmation
 * when true, render AddressConfirmation
 * when Back is clicked, go back
 */

const AddressServiceElement = () => {
  const [addressToBeConfirmed, setAddressToBeConfirmed] = useState({})
  const [readyForConfirmation, setReadyForConfirmation] = useState(false)
  const makeReadyForConfirmation = state => {
    setAddressToBeConfirmed(state)
    setReadyForConfirmation(true)
  }

  return (
    <div style={{ margin: '200px auto 0', maxWidth: '500px' }}>
      {
        !readyForConfirmation ?
          <AddressLookup submitForConfirmation={makeReadyForConfirmation}/>
          :
          <AddressConfirmation
            address={addressToBeConfirmed}
            goBack={() => setReadyForConfirmation(false)}
          />
      }
    </div>
  )
}

export default AddressServiceElement