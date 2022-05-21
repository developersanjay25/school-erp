import { Button, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'

const getContent = (props) => {
    switch(props.dialog){
       case 'ADD_STUDENT':
           return <Addstudent {...props}/>
       case 'ADD_FEES':
           return <AddFees {...props}/>
       case 'ADD_CLASS':
           return <AddsClass {...props}/>
     }
   }

   const token = localStorage.getItem('token');
   console.log(token);
function DialogBox(props) {
  return (
    <>{getContent(props)}</>
  )
}

function Addstudent(props) {
    const [name,setName] = useState('');
    const [classname,setClassname] = useState(' ');
    const [dob,setDob] = useState('');

    function addstudent(){
        axios.defaults.headers.common['Authorization'] = `bearer ${token}`;
        
        axios.post('http://localhost:5000/addstudent',{name,classname,dob}).then((data) => {
                console.log(data);
                props.refreshdata();
                props.snackbar(true,data.data.type,data.data.message);

                if(data.data.type == 'success'){
                    props.closedialog();
                }

        }).catch((err) => {
            console.log(err);
        })
    }
    
    return (<>
      <Typography>Add student</Typography>
      <br />
      <Stack spacing={2}>
          <TextField size='small' label='name' onChange={e => setName(e.target.value)}/>
          <Select size='small' onChange={e => setClassname(e.target.value)}>
              <em value=" ">Select class</em>
              {props.classes.map((item) => {
                  return <MenuItem value={item.classname}>{item.classname}</MenuItem>
              })}
          </Select>
          <input type='date' style={{padding:12, border : '1px solid #c4c4c4', borderRadius : '5px'}} onChange={e => setDob(e.target.value)}/>
          <Button variant='contained' onClick={addstudent}>Add Student</Button>
      </Stack>
      </>
    )
  }
  

  function AddFees(props) {
    const [fees, setFees] = useState(0);
    const [classname, setClassname] = useState('');

    function addfees(){
        axios.defaults.headers.common['Authorization'] = `bearer ${token}`;
        axios.patch(`http://localhost:5000/addfees?fees=${fees}&classname=${classname}`).then((data) => {
                console.log(data);
                props.refreshdata();
                props.snackbar(true,data.data.type,data.data.message);
                if(data.data.type == 'success'){
                    props.closedialog();
                }
        }).catch((err) => {
            console.log(err);
            props.setSnackbar1(true,'error',err.message);

        })
    }

    return (<>
        <Typography>Add Fees</Typography>
        <br />
        <Stack spacing={2}>
            <Select size='small' onChange={e => setClassname(e.target.value)}>
                <em value="">Select class</em>
                {props.classes.map((item) => {
                    return <MenuItem value={item.classname}>{item.classname}</MenuItem>
                })}
            </Select>
            <TextField size='small' label='Fees' onChange={e => setFees(e.target.value)}/>
            <Button variant='contained' onClick={addfees}>Add Fees</Button>
        </Stack>
        </>
    )
  }

  
function AddsClass(props) {
    const [classname,setclassname] = useState('');

    function addclass(){
        axios.defaults.headers.common['Authorization'] = `bearer ${token}`;
        axios.post('http://localhost:5000/addclass',{classname}).then((data) => {
                console.log(data);
                props.refreshdata();
                props.snackbar(true,data.data.type,data.data.message);

                if(data.data.type == 'success'){
                    props.closedialog();
                }
        }).catch((err) => {
            console.log(err);
            props.snackbar(true,'error',err.response);

        })
    }

    return (
        <>
        <Typography>Add Class</Typography>
        <br />
        <Stack spacing={2}>
            <TextField onChange={(e) => setclassname(e.target.value)} size='small' label='Class name'/>
            <Button onClick={addclass} variant='contained'>Add Class</Button>
        </Stack>
        </>
    )
  }

export default DialogBox