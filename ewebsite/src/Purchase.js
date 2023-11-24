import { useState } from 'react';
import './App.css'
import Division from './Division';
import axios from 'axios'
function Purchase(){
    const [product,setProd]=useState("")
    const [state,setState]=useState(false)
    const [datas,setDatas]=useState([])
    const handlePurchase=(event)=>{
        const bill=(event.target.id)
        alert(bill)
        window.location.href=`/Purchase/billing/${bill}`
      };
    const Attmept=()=>{
        alert(product)
        axios.post('http://localhost:3500/purchase',
        {
           product
        })
        .then(data => {
            if(data.data.status!=="fail"){
                setDatas(data.data.status)
                setState(true)
              }
          })
          .catch(err => {
            console.log(err);
          })
    }
    return(
       <>
       <Division />
        <div className='purchase'>
        <input list='products' placeholder='Enter the product' onChange={(e)=>{setProd(e.target.value)}} />
        <button onClick={Attmept}>🔍</button>
        <br></br>
        <datalist id='products'>
            <option value={"Gadgets"}/>
            <option value={"Decorations"}/>
            <option value={"Preservatives"}/>
            <option value={"House Hold Items"}/>
            <option value={"Furnitures"}/>
        </datalist>
        {state &&
        datas.map((data)=>(
            <div className='card' >
                <img src={data.name} width={"35%"} alt='image of product'></img>
                <h3>{data.url}</h3>
                <p>{data.desc}</p>
                <i>Rate:{data.rate}</i>
                <button onClick={handlePurchase} id={`${data.email},${data.url},${data.rate}`}>Purchase</button>
            </div>
        ))
        }
        </div>
       </>
    )
}
export default Purchase;