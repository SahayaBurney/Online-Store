import { useState } from 'react';
import './App.css';
import Heading from './head';
import axios from 'axios'
function Login() {
  const [email,setemail]=useState("");
  const [pss,setpss]=useState("")
  const confirm=()=>{
    axios.post('http://localhost:3500/Login',
        {
            email,
            pss
        }
      )
      .then(data => {
        if(data.data.status!=="fail"){
          window.location.href=`/Home/${data.data.status}`
        }
      })
      .catch(err => {
        console.log(err);
      })
  }
    return (
    <>
    <Heading />
    <div className='login'>
      <input type='email' name='email' placeholder='Enter email' onChange={(e)=>{setemail(e.target.value)}} /><br></br>
      <input type='password' name='pss' placeholder='Enter password' onChange={(e)=>{setpss(e.target.value)}} /><br></br>
      <input type='submit' value={"Login"} onClick={confirm}></input>
    </div>
    </>
      );
}

export default Login;
