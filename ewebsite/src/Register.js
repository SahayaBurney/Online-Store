import './App.css'
import Heading from './head';
import {useState} from'react'
import axios from 'axios'
import { Link, json, useParams } from 'react-router-dom';
function Register(){
    const [nme,setName]=useState("");
    const [email,setmail]=useState("");
    const [pno,setpno]=useState("");
    const [pass,setpss]=useState("");
    const valid=()=>{ 
        alert("Hello One" +nme)
        axios.post('http://localhost:3500/Register',
        {
            nme,
            email,
            pno,
            pass
        }
      )
      .then((data)=>{
        if(data.data.status==='ok'){
            window.location.href = `/Login${email}`
          }else{
             alert("Invalid information");
          }
    })

    }
    return(
        <>
        <Heading />
        <div className='reg'>
            <input type='text' placeholder='Enter name' onChange={(e)=>setName(e.target.value)} /><br></br>
            <input type='email' placeholder='Enter mail id' onChange={(e)=>setmail(e.target.value)} /><br></br>
            <input type='number' placeholder='Enter contact number' onChange={(e)=>setpno(e.target.value)} /><br></br>
            <input type='password' placeholder='Enter password' onChange={(e)=>setpss(e.target.value)} /><br></br>
            <Link to='/Main Page'><button  onClick={valid}>Register</button></Link>
            <Link to='/Login'><button>Login</button></Link>
            {/* <Link to='/Division'><button>Register</button></Link> */}
        </div>
        </>
    )
}

export default Register;