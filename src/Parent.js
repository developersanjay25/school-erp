import { Alert, AppBar, Button, Snackbar, Stack, Toolbar, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';

function Parent() {
    const [searchParams, setSearchParams] = useSearchParams();
    const sid = searchParams.get("sid");
    const classname = searchParams.get("classname");
    const [data,setData] = useState({});
    const [snackbar,setSnackbar] = useState({open : false, message : '', type: ''});

    useEffect(() => {
        getsdata();
    },[])

    function getsdata(){
        axios.get(`http://localhost:5000/getstudent?sid=${sid}&classname=${classname}`).then((data) => {
                console.log(data);
                setData(data.data.message);
                if(data.data.type == 'error'){
                    alert(data.data.message);
                    window.location.href = '/'
                }
        }).catch((err) => {
            console.log(err);
            alert(err.message)
        })
    }

    function payfee(){
        axios.patch(`http://localhost:5000/payfees?sid=${sid}&classname=${classname}`).then((data) => {
            console.log(data);
            setSnackbar({open : true, type : data.type, message: 'success'})
            getsdata();
        }).catch((err) => {
            console.log(err);
            setSnackbar({open : true, type : 'error', message: err.message})
        })
    }

  return (
    <div>
         <div style={{height:'70px'}}>
             <AppBar>
            <Toolbar>
                    <Typography variant='contained' style={{color : 'white'}}>Parent's dashboard</Typography>
            </Toolbar>
        </AppBar>
        </div>
        <Stack alignItems='center' height='85vh' justifyContent='center' spacing={2}>
            <Typography variant='h3'>{classname}</Typography>
            <Typography variant='h4'>{data.name}</Typography>
            <Typography variant='h5'>{data.dob}</Typography>
            <Typography variant='h5'>OutStanding Fees : {data.fees}</Typography>
            <Typography variant='h5'>{data.paymenttime ? `Last payment : ${data.paymenttime}` : ''}</Typography>
            <Button onClick={payfee} disabled={data.fees == 0 ? true : false} variant='contained'>{Number(data.fees) == 0 ? 'Paid' : 'Pay'} </Button>
        </Stack>

        <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({...snackbar,open :false})}>
            <Alert severity={snackbar.type}>{snackbar.message}</Alert>
        </Snackbar>
    </div>
  )
}

export default Parent