import React, { useState } from 'react'
import { Button, TextField, Stack, Typography } from '@mui/material';
import axios from 'axios';

function Adminlogin() {
  const [username, setUsername] = useState(''); 
  const [Password, setPassword] = useState(''); 

  const adminlogin = () => {
      axios.get(`http://localhost:5000/adminlogin?username=${username}&psd=${Password}`).then((data) => {
              console.log(data)
              if(data.data.token){
                localStorage.setItem('token',data.data.token);
                window.location.href = '/admin';
              }
      }).catch((err) => {
          console.log(err);
      })
  }

  return (
    <Stack spacing={2} elevation={0}>
      <Typography variant='h5'>Admin Login</Typography>
      <TextField size='small' label='Username' onChange={e => setUsername(e.target.value)}/>
      <TextField size='small' label='Password' onChange={e => setPassword(e.target.value)}/>
        <Button variant='contained' onClick={adminlogin}>Login</Button>
    </Stack>
  )
}

export default Adminlogin