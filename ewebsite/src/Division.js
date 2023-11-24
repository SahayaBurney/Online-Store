import './App.css'
import Heading from './head';
import { Link, json, useParams } from 'react-router-dom';
function Division(){
    return (
        <>
        <Heading />
        <div className='div'>
            <ul>
                <li>
                    <Link to={'/Home'}><button>Home</button></Link>
                </li>
                <li>
                <Link to={'/Purchase'}><button>Shopping</button></Link>
                </li>
                <li>
                <Link to={'/bussiness'}><button>Start your own bussiness</button></Link>
                </li>
                <li>
                <Link to={'/About'}><button>About Us</button></Link>
                </li>
            </ul>
        </div>
        </>
         )
}
export default Division;
