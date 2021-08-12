import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { startGetBills } from '../actions/billAction'
import { startGetCustomers } from '../actions/customersAction'
import { startGetProducts } from '../actions/productsAction'
import { startGetUsers } from '../actions/usersAction'
import '../styles/products.css'
function Home() {
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(startGetBills())
        dispatch(startGetCustomers())
        dispatch(startGetProducts())
        dispatch(startGetUsers())
        
    },[])
    return (
        <div>
            <h1>the BiLL app</h1><hr/><br/><br/>
            <div className="robin">
            <h3>Welcome!</h3>
            <h3>A Penny saved is a penny earned. </h3>
            </div>
            <br/>
            <br/>
            <div className='instruction'>
            <h4><u>Instructions.</u></h4>
            <ul>
            <li>Add your store products in Products Menu </li>
            <li>Add your customers in customers menu</li>
            <li>Make Bills from the provided data  </li>
            <li>Happy Billing!</li>
            </ul>
            </div>
        </div>
    )
}
export default Home
