import React, { useState } from 'react'
import { Button, TextField, Stack, Typography, Select, MenuItem } from '@mui/material';


function ParentLogin(props) {
    const {classes} = props;
    const [classname,setclassname] = useState(" ");
    const [studentid,setStudentID] = useState("");
    
  function login(){
    window.location.href = `/parent?sid=${studentid}&classname=${classname}`
  }

  return (
    <Stack spacing={2} elevation={0}>
      <Typography variant='h5'>Parent</Typography>

      <Select size='small' value={classname} onChange={e => setclassname(e.target.value)}>
        <MenuItem value=" ">Select class</MenuItem>
          {classes.map((item) => {
              return <MenuItem key={item._id} value={item.classname} >{item.classname}</MenuItem>
          })}
      </Select>
        <TextField size='small' onChange={(e) => {setStudentID(e.target.value)}} label='Student ID'/>
        <Button variant='contained' onClick={login}>Login</Button>
    </Stack>
  )
}

export default ParentLogin