import './App.css'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
function Billing(){
    const {bill}=useParams();
    const brief=bill.split(",")
    const [add,setAdd]=useState("")
    const Book=()=>{
        alert(add)
        const email= localStorage.getItem("email")
        axios.post('http://localhost:3500/Billing',
        {
           email,
           brief,
           add
        })
        .then(data => {
            if(data.data.statu==="pass"){
                alert("Pass")
              }
          })
          .catch(err => {
            console.log(err);
          })
    }
    return(
        <>
        <div className='billing'>
        <label>Mail id of the saler</label><br></br>
        <input type='email' value={brief[0]} readOnly/><br></br>
        <label>Product to be purchased</label><br></br>
        <input type='text' value={brief[1]} readOnly/><br></br>
        <label>The price of the product</label><br></br>
        <input type='text' value={brief[2]} readOnly/><br></br>
        <label>Enter address to sent</label><br></br>
        <textarea cols={30} onChange={(e)=>{setAdd(e.target.value)}}></textarea>
        <button onClick={Book} > Booking</button>
        </div>
        </>
    )
}
export default Billing;