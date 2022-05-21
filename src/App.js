import { Button, Paper, Stack} from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react';
import Adminlogin from './Adminlogin';
import './App.css';
import ParentLogin from './ParentLogin';

function App() {
  const [whichlogin, setwhichlogin] = React.useState(0);
  const [classes, setClasses] = React.useState([]);

    useEffect(() => {
      axios.get('http://localhost:5000/getclasses').then((data) => {
              console.log(data)
              setClasses(data.data)
      }).catch((err) => {
          console.log(err);
      })
    },[])


  return (
    <div className="App">
    <Stack alignItems='center' justifyContent='center' height='100vh' style={{backgroundColor:'blue'}}>  
      <Paper component={Stack} padding={5} spacing={2} alignItems='center'>
        <Stack direction='row'>
        <Button sx={{borderBottom: whichlogin ? 'none' : '1px solid blue'}} onClick={() => setwhichlogin(0)}>Parents </Button>
        <Button  sx={{borderBottom: whichlogin ? '1px solid blue' : 'none'}} onClick={() => setwhichlogin(1)} >Admin</Button>
        </Stack>
      
        {whichlogin ? <Adminlogin /> : <ParentLogin classes={classes}/> }

      </Paper>
    </Stack>
    </div>
  );
}

export default App;
