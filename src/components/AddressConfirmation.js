import React from 'react'
import axios from 'axios'
import { Button, Typography } from "@material-ui/core";
import { pathName } from "../pathname";

const AddressConfirmation = ({ address, goBack, apiEndpoint, goToDashboard, addressID }) => {
  const userID = JSON.parse(sessionStorage.getItem('user')).id

  const handleConfirm = () => {
    axios({
      method: 'POST',
      url: `${pathName}/api/addresses/${apiEndpoint}`,
      headers: {
        'content-type': 'application/json'
      },
      data: { ...address.components, deliveryLine1: address.deliveryLine1, lastLine: address.lastLine, userID, addressID: addressID }
    })
      .then(res => {
        console.log(res)
        goToDashboard()
      })
      .catch(err => console.log('oh noes an error! => ', err))
  }

  return (
    <div style={{ border: '2px solid #ccc', borderRadius: '5px', padding: '25px' }}>
      <Typography component='h1' variant='h6' style={{ marginBottom: '1rem' }}>Is this correct?</Typography>
      <Typography component='p' variant='h5' >{address.deliveryLine1}</Typography>
      <Typography component='p' variant='h5' style={{ marginBottom: '2rem' }}>{address.lastLine}</Typography>
      <Button variant='contained' style={{ marginRight: '20px' }} onClick={goBack}>Back</Button>
      <Button variant='contained' color='primary' onClick={handleConfirm}>Confirm</Button>
    </div>
  )
}

export default AddressConfirmation