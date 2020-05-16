import React, { useState, useEffect } from 'react';
import axios from "axios";
import AddressServiceElement from './AddressServiceElement'
import { Button } from "@material-ui/core";
import { pathName } from "../pathname";

/**
 * @DELETE_EVERYTHING
 * MAKE A REAL DASHBOARD COMPONENT
 * 
 * on page load, go get the addresses and store them in a state variable. (GET /api/addresses) => [addresses, setAddresses]
 * keep track of various modes: view, create, edit
 * @VIEW
 * show all the addresses for the user, each with an edit button and delete button.
 * show an ADD button below them.
 * Edit button toggles edit mode
 * 
 * @EDIT
 * show the address form with method set to 'update'
 * on successful edit, change mode to 'view'
 * 
 * @CREATE
 * show the address form with method set to 'add'
 * on successful add, change mode to 'view'
 */

const AddressList = ({ setAddressID, loadEditForm, loadAddForm }) => {
  const [addresses, setAddresses] = useState([])
  const userID = JSON.parse(sessionStorage.getItem('user')).id
  const fetchAddresses = () => {
    axios.get(`${pathName}/api/addresses/${userID}`)
      .then(res => res.data)
      .then(list => setAddresses(list))
      .catch(err => console.log(err))
  }

  useEffect(fetchAddresses, [])

  const handleDelete = (addressID) => {
    axios({
      method: 'DELETE',
      url: `${pathName}/api/addresses`,
      headers: {
        'content-type': 'application/json'
      },
      data: {
        addressID: addressID,
        userID: userID
      }
    })
      .then(res => fetchAddresses())
    .catch(err => console.log(err))
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Your Addresses</h1>
      <Button variant='contained' color='primary' onClick={loadAddForm}>Add</Button>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
        {
          addresses.map(address => {
            return (
              <div key={address.id}>
                <h2>#{address.id}</h2>
                <p>{address.delivery_line}</p>
                <p>{address.last_line}</p>
                <Button variant='outlined' color='primary' style={{ margin: '0 20px 0 0' }} onClick={() => { setAddressID(address.id); loadEditForm()} }>Edit</Button>
                <Button variant='outlined' color='secondary' onClick={() => handleDelete(address.id)}>Delete</Button>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

const Dashboard = (props) => {
  const [mode, setMode] = useState('view')
  const [selectedAddress, setSelectedAddress] = useState(null)

  return (
    <div>
      {
        mode === 'view' ?
          <AddressList setAddressID={setSelectedAddress} loadEditForm={() => setMode('update')} loadAddForm={() => setMode('add')} />
          :
          <AddressServiceElement addressID={selectedAddress} apiEndpoint={mode} goToDashboard={() => setMode('view')} />
      }
    </div>
  )
}

export default Dashboard