import React,{useEffect} from 'react'
import {startGetUsers} from '../actions/usersAction'
import {useDispatch, useSelector} from 'react-redux'
import '../styles/users.css'
function Users() {
    const dispatch=useDispatch()
    const users=useSelector((state)=>{
        return state.users
    })
    const a=users[0]
    useEffect(()=>{
        dispatch(startGetUsers())
        
    },[])

    return (
        <>
            {a&&<div className='wow'>
            <h1>User Info</h1>  
            <hr/>
                <p> User ID - {a._id}</p>
            <p>Username - {a.username}</p>
            <p>Email - {a.email}</p>
            <p>Business Name - {a.businessName}</p>
            <p>Address - {a.address}</p>
            <p>Created at - {a.createdAt.toString().slice(0,10)}</p>
            <p>Updated at -{a.updatedAt.toString().slice(0,10)}</p>
                </div>}
        </> )
}

export default Users
