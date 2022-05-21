import { AppBar, Stack, Toolbar, Typography, Button, Paper, Divider, Dialog, DialogContent, Snackbar, Alert } from '@mui/material'
import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DialogBox from './Addstudent';




function Admin() {
  const [classes, setClasses] = useState([]);
  const [selectedclass, setselectedClasses] = useState(0);
  const [Dialogopen, setDialogopen] = useState('');  
  const [snackbar, setSnackbar] = useState({open : false, message : '',type : ''});  

    useEffect(() => {
        if(!localStorage.getItem('token')){
            window.location.href = '/'
        }
        classdata();  
      },[])

      function closedialog(){
            setDialogopen('');
      }      

      function logout(){
          localStorage.removeItem('token');
          window.location.href = '/'
      }

      function setSnackbar1(open,type,message){
        setSnackbar({open,type,message})
      }
      
      function classdata(){
            axios.get('http://localhost:5000/getclasses').then((data) => {
                console.log(data)
                setClasses(data.data)
        }).catch((err) => {
            console.log(err);
        })
      }

      var columns = [   { field: 'sid', headerName: 'SID',flex : 1},
      { field: 'name', headerName: 'Name', flex : 1},
      { field: 'dob', headerName: 'Date Of Birth', flex : 1},
      { field: 'fees', headerName: 'OutStanding fees', flex : 1},
      { field: 'paymenttime', headerName: 'Last payment At', flex : 1}
        ];

  return (
    <div className='admin-panel'>
         
        <br />
        <br />
        <br />
        <br />

        <Dialog 
        open = {Dialogopen ? true : false}
        onClose={closedialog}
        >
        <DialogContent>
            <DialogBox 
            dialog={Dialogopen} 
            classes={classes} 
            refreshdata={classdata} 
            closedialog={closedialog}
            snackbar={setSnackbar1}
            />
        </DialogContent>
        </Dialog>


        <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar(state => ({...state,open : false}))}>
            <Alert severity={snackbar.type}>{snackbar.message}</Alert>
        </Snackbar>

    <Stack direction='row' spacing={3} marginLeft={2} marginRight={2}>
        <Stack spacing={1}>
        {classes.map((item,ind) => {
            return <React.Fragment key={`table${ind}`}>
            <Button variant={selectedclass == ind ? 'contained' : 'text'} onClick={() => {setselectedClasses(ind)}}>{item.classname}</Button>
            </React.Fragment>
        })}
        </Stack>
        
        <Divider orientation='vertical' flexItem/>

        <Stack flexGrow={1} spacing={2} margin={2}>
        
        <Stack spacing={2} direction='row' divider={<Divider orientation='vertical' flexItem/>}>
            <Button variant='contained' onClick={() => setDialogopen('ADD_CLASS')}>Add class</Button>
            <Button variant='contained' onClick={() => setDialogopen('ADD_FEES')}>Add Fees</Button>
            <Button variant='contained' onClick={() => setDialogopen('ADD_STUDENT')}>Add students</Button>
        
            </Stack>

        <Stack>
        <Typography variant='h4'>{classes[selectedclass]?.classname}</Typography>
        </Stack>

        <Paper sx={{height: '372px'}}>
        {classes.length ?
        <DataGrid 
          getRowId={(item) => item.sid}
          rows={classes[selectedclass].students}
          columns={columns}
          pageSize={5}/> 
          : <></>
        }
        </Paper>
    </Stack>

    </Stack>
    </div>
  )
}

export default Admin