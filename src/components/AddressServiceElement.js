import React, { useState } from 'react'
import AddressLookup from "./AddressLookup";
import AddressConfirmation from './AddressConfirmation'

const AddressServiceElement = ({ addressID, apiEndpoint, goToDashboard }) => {
  const [addressToBeConfirmed, setAddressToBeConfirmed] = useState({})
  const [readyForConfirmation, setReadyForConfirmation] = useState(false)
  const makeReadyForConfirmation = state => {
    setAddressToBeConfirmed(state)
    setReadyForConfirmation(true)
  }

  console.log(addressID)
  return (
    <div style={{ margin: '200px auto 0', maxWidth: '500px' }}>
      {
        !readyForConfirmation ?
          <AddressLookup goToDashboard={goToDashboard} submitForConfirmation={makeReadyForConfirmation}/>
          :
          <AddressConfirmation
            address={addressToBeConfirmed}
            goBack={() => setReadyForConfirmation(false)}
            apiEndpoint={apiEndpoint}
            goToDashboard={goToDashboard}
            addressID={addressID}
          />
      }
    </div>
  )
}

export default AddressServiceElement