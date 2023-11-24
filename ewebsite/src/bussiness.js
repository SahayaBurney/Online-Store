import { useState } from 'react'
import './App.css'
import Division from './Division'
import axios from 'axios';


function Bussiness() {
    const [prod,setProd]=useState("");
    const [rate,setRate]=useState(0)
    const [nme,setNme]=useState("")
    const [url,setUrl]=useState("")
    const [desc,setDesc]=useState("")
    const [check,setCheck]=useState(true)
    const [display,setDisplay]=useState(false)
    const [orders,setOrder]=useState([])
    const Check=()=>{
        const  email=localStorage.getItem("email")
        axios.post('http://localhost:3500/Display',
        {
            email  
        })
        .then(data => {
            if(data.data.status!=="fail"){
                const parsedOrders = data.data.status;
                setOrder(parsedOrders);
                alert(parsedOrders[0].rate);
                alert(orders.length)
                setCheck(false);
                setDisplay(true)
              }
          })
          .catch(err => {
            console.log(err);
          })
          setDisplay(true);
    }
    const Add=()=>{
        alert(nme+" "+prod+" "+rate+" "+desc)
       const  email=localStorage.getItem("email")
       const text=nme+" "+url+" "+prod+" "+rate+" "+desc
        axios.post('http://localhost:3500/bussiness',
        {
            email,
            nme,
            url,
            prod,
            rate,
            desc,
        }
      )
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      })
    }
    return(
        <>
        <Division />
        <div className='bus'>
            <div className='add'>
                    <input list='products' placeholder='Enter the product 'onChange={(e)=>{setProd(e.target.value)}}/><br></br>
                    <datalist id='products'>
                        <option value={"Gadgets"}/>
                        <option value={"Decorations"}/>
                        <option value={"Preservatives"}/>
                        <option value={"House Hold Items"}/>
                        <option value={"Furnitures"}/>
                    </datalist>
                    <input type='text' placeholder='Enter name of the product' onChange={(e)=>{setUrl(e.target.value)}}/><br></br>
                    <input type='text' placeholder='Enter product image link' onChange={(e)=>{setNme(e.target.value)}}/><br></br>
                    <input type='number' min={1} placeholder='Enter rate of the product' onChange={(e)=>{setRate(e.target.value)}}/><br></br>
                    <textarea placeholder='Enter product description' rows={10} cols={30} onChange={(e)=>{setDesc(e.target.value)}}></textarea><br></br>
                    <button onClick={Add}>Add Product</button>
            </div>
            <div className='view'>
                {check &&
                <button onClick={Check}>check</button>   
                }
                {display && (
                <>
                <h1>Your Products are</h1>
                {orders.map((data) => (
                <div className='disp' key={data.id}>
                    <p>Purchase Name:{data.pur_nme}</p>
                    <p>Purchased Product Name:{data.product}</p>
                    <p>Rate:{data.rate}</p>
                    <p>Address:{data.address}</p>

                </div>
                ))}
                </>
                )}

            </div>
        </div>
        </>
    )
}
export default Bussiness