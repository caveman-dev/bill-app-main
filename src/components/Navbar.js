import React, { useEffect, useState } from 'react'
import {Link,Route }  from 'react-router-dom'
import Billing from './Billing'
import Products from './Products'
import Users from './Users'
import Customers from './Customers'
import Dashboard from './Dashboard'
import Home from './Home'
import '../styles/navbar.css'

import{startGetBills} from '../actions/billAction'
import{startGetProducts} from '../actions/productsAction'
import { startGetUsers } from '../actions/usersAction';
import { startGetCustomers } from '../actions/customersAction';
import 'boxicons'
import { useDispatch, useSelector } from 'react-redux'
function Navbar() {

  useEffect(()=>{

    dispatch(startGetBills())
    dispatch(startGetCustomers())
    dispatch (startGetProducts())
    dispatch(startGetUsers())
   },[])
    let sidebar = document.querySelector(".sidebar");
let closeBtn = document.getElementById("btn");
const [hello,setHello]=useState(false)
const users=useSelector((state)=>{
  return state.users
})
const dispatch=useDispatch()
useEffect(()=>{
  dispatch(startGetUsers())
},[])
const handleMenu=()=>{
  setHello(!hello)
    sidebar.classList.toggle("open");
 menuBtnChange();
}
function menuBtnChange() {
 if(sidebar.classList.contains("open")){
   closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");//replacing the iocns class
 }else {
   closeBtn.classList.replace("bx-menu-alt-right","bx-menu");//replacing the iocns class
 }
}
const handleLogout=()=>{
  localStorage.removeItem('token')
  window.location.reload();

}
    return (<>
         <div className="sidebar">
         <div className="logo-details">
         <div className="logo_name">the Bill app</div>
         <box-icon className='bicon' animation='tada-hover' name='menu' id='btn' onClick={handleMenu} ></box-icon>
            </div>
            <ul className="nav-list">
            <li>
         <Link to='/'>
         <box-icon name='home'  type='solid' className='bicon'></box-icon>
         <span className="links_name">Home</span>
         </Link>
        <span className="tooltip">Home</span>
        </li>  
    
        <li>
        <Link to='/products'>
        <box-icon className='bicon' type='solid' name='purchase-tag'></box-icon>
        <span className="links_name">Products</span>
        </Link>
        <span className="tooltip">Products</span>
        </li>
        <li>
        <Link to='/customers'>
        <box-icon className='bicon' name='group'  ></box-icon>
        <span className="links_name">Customers</span>
        </Link>
        <span className="tooltip">Customer</span>
        </li>
        <li>
        <Link to='/bills'>
        &nbsp;          <box-icon name='receipt' type='solid' ></box-icon>
        <span className="links_name">Billing</span>
        </Link>
        <span className="tooltip">Billing</span>
        </li>
        <li>
        <Link to='/dashboard'>
        <box-icon className='bicon' type='solid' name='dashboard'></box-icon>
        <span className="links_name">Dashboard</span>
        </Link>
        <span className="tooltip">Dashboard</span>
        </li>
        <li>
        <Link to='/users'>
          <box-icon className='bicon' name='user' type='solid' ></box-icon>
          <span className="links_name">User</span>
        </Link>
       <span className="tooltip">User</span>
       </li>
       <li className="profile">
       <div className="profile-details">
         {hello&& <>
         <div className='yes'><box-icon name='user-circle' color='white' type='solid' ></box-icon></div>
         <span className="tooltip">sign out</span>
         <div className="name_job">
         <div className="name">{users[0].username}</div>
         <div className="job">{users[0].email}</div>
        </div></>
         } 
         </div>
        <button data-bs-toggle="tooltip" data-bs-placement="right" title="Sign Out" className='dexter' onClick={handleLogout}><box-icon  className='bicon' color='white' name='log-out' id='log_out'></box-icon></button> 
        </li>
            </ul>
           
         </div>
         <div className="home-section">
     
<Route path='/bills' component={Billing} ></Route>
<Route path='/' component={Home} exact={true}></Route>
<Route path='/products' component={Products} ></Route>
<Route path='/users' component={Users}></Route>
<Route path='/customers' component={Customers}></Route>
<Route path='/dashboard' component={Dashboard}></Route>
  </div>
    </>
    )
}

export default Navbar
