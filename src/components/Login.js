import React, { useState } from 'react'
import axios from 'axios'
import BillingContainer from './BillingContainer'
import logo from '../loginAssets/img/payment.png'
import '../styles/app.css'
import '../loginAssets/bootstrap/css/bootstrap.min.css'
import '../loginAssets/css/Login-form-1.css'
import '../loginAssets/css/Login-form.css'
import '../loginAssets/css/styles.css'
import swal from 'sweetalert'
function Login() {
    const[options,setOptions]=useState("signin")
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const[loggedIn,setLoggedIn]=useState(false)
    const[username,setUsername]=useState('')
    const[address,setAddress]=useState('')
    const[businessName,setBusinessName]=useState('')
    const zed=document.getElementById('one')
    if(zed){
        zed.style.color='#ffd700'
        if(options=='signup'){
            zed.style.color='#ffffff'
        }
    }
    const handleOptions=(e)=>{
        if(e.target.name=='signin'){
            setOptions('signin')
            e.target.style.color = '#ffd700'
            const z=document.getElementById('two')
            z.style.color='#ffffff'
        }
        else {
            setOptions('signup')
            const z=document.getElementById('one')
            const y=document.getElementById('two')
            z.style.color='#ffffff'
            y.style.color='#ffffff'
        }
        e.target.style.color = '#ffd700'
    }
    const handleLogin=()=>{
        setLoggedIn(!loggedIn)
    }
    const handleHover=((e)=>{
        const eel =e.target
        eel.style.color='rgba(44,49,52,0.82)';
        eel.style.backgroundColor=	'#ffd700'
    })
    const handleHoverOut=((e)=>{
        const eel =e.target
        eel.style.color='#ffd700'
        eel.style.backgroundColor=	'rgba(44,49,52,0.82)'
    })
    const handleSubmit=(e)=>{
        e.preventDefault()
        if(options=='signin'){
            const formData={
                email:email,
                password:password
            }
            axios.post("https://dct-billing-app.herokuapp.com/api/users/login",formData)
                .then((response)=>{
                    const result=response.data
                    if(result.hasOwnProperty('errors')){
                        alert(result.errors)
                    }
                    else{
                        localStorage.setItem('token',result.token)
                        handleLogin()
                        //window.location.reload();
                        swal({
                            title: "Logged in!",
                            
                            icon: "success",
                            timer: 2000,
                            button: false
                          })
                    }
                })
                .catch((err)=>{
                    swal({
                        title: "Error!",
                        text: err.message,
                        icon: "error",
                        timer: 2000,
                        button: false
                      })
                })
                setPassword('')
                setEmail('')
        }
        else{
          if(!(username&&email&&password&&businessName&&address)){
            swal({
                title: "Error!",
                text: "Enter all the inputs",
                icon: "error",
                timer: 2000,
                button: false
              })
          }
          else{
            const  formData={
                username:username,
                email:email,
                password:password,
                businessName:businessName,
                address:address
            }
            axios.post("https://dct-billing-app.herokuapp.com/api/users/register",formData)
                .then((response)=>{
                    swal({
                        title: "Signed Up!",
                        text:'Now click on login',
                        icon: "success",
                        timer: 2000,
                        button: false
                      })
                      setOptions('signin')
            })
            .catch((err)=>{
                swal({
                    title: "Error!",
                    text: err.message,
                    icon: "error",
                    timer: 2000,
                    button: false
                  })
            })
            const l=document.getElementById('two')
            l.style.color='#ffffff'
          }
        }
    }
    return (<>
        { localStorage.getItem('token')?(
            <BillingContainer />
                ):(
                <form onSubmit={handleSubmit} id="form" style={{fontFamily: 'Quicksand, sans-serif', backgroundColor: 'rgba(44,40,52,0.73)', width: '320px', padding: '40px', filter: 'brightness(79%)', margin: '0px'}}>
                <h1 id="head" style={{color: '#ffd700', fontSize: '24px', fontFamily: '"Advent Pro", sans-serif'}}>The BILLING app</h1>
                <div className="d-flex"><img className="rounded img-fluid flex-row justify-content-center align-items-center align-content-center align-self-center mx-auto" data-toggle="tooltip" data-bs-tooltip data-placement="bottom" id="image" style={{width: '110px', height: 'auto'}} src={logo} /></div>
                <div className='paw'>
                <div className="d-flex btn-group btn-group-toggle"  style={{fontSize: '16px'}}>
                <input id='one' type='button'  value='&nbsp;&nbsp;LOGIN&nbsp;&nbsp;'name='signin' onClick={handleOptions}className="justify-content-center align-items-center align-content-center align-self-center flex-wrap mx-auto btn btn-secondary active"/>
                <input id='two'type='button' value ='REGISTER'name='signup' onClick={handleOptions} className="btn btn-secondary"/></div>
                </div> 
                <div className="form-group"><input className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} type="email" id="formum" style={{fontSize: '15px'}} placeholder="Email*" required minLength={5} maxLength={30} autoFocus /></div>
                <div className="form-group"><input value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" type="password" id="formum2" style={{fontSize: '15px'}} placeholder='Password*' required minLength={5} maxLength={30}/></div>
                {(options=='signup')?(<>
                <div className="form-group" style={{fontSize: '15px'}}><input className="form-control"  value={username} onChange={(e)=>setUsername(e.target.value)} type="text" id="formum" placeholder="Username*" required minLength={6} maxLength={20} autoFocus /></div>
                <div className="form-group"><input className="form-control" value={businessName} onChange={(e)=>setBusinessName(e.target.value)} type="text" id="formum" style={{fontSize: '15px'}} placeholder="Business Name*" autoFocus /></div>
                <div className="form-group"><input className="form-control"  value={address} onChange={(e)=>setAddress(e.target.value)} type="text" id="formum" style={{fontSize: '15px'}} placeholder="Address*" autoFocus /></div><button className="btn btn-light" id="butonas" style={{width: '100%', height: '100%', marginBottom: '0px', backgroundColor: 'rgba(44,49,52,0.82)', color: '#ffd700', paddingBottom: '6px'}}onMouseEnter ={handleHover}  type="submit" value='sign up' >Signup</button>
    </>
     ):(<>
                <button onMouseEnter ={handleHover} onMouseLeave={handleHoverOut}  type="submit" value='sign in' className="btn btn-light" id="butonas" style={{width: '100%', height: '100%', marginBottom: '0px', backgroundColor: 'rgba(44,49,52,0.82)', color: '#ffd700', paddingBottom: '6px'}}>Signin</button>        
                 </>
                )}
            </form>)}

            </>
    )
}

export default Login
//            <form id="form" style={{fontFamily: 'Quicksand, sans-serif', backgroundColor: 'rgba(44,40,52,0.73)', width: '320px', padding: '40px', filter: 'brightness(79%)', margin: '0px'}}>
//         <h1 id="head" style={{color: '#ffd700', fontSize: '24px', fontFamily: '"Advent Pro", sans-serif'}}>The BILLING app</h1>
//         <div className="d-flex"><img className="rounded img-fluid flex-row justify-content-center align-items-center align-content-center align-self-center mx-auto" data-toggle="tooltip" data-bs-tooltip data-placement="bottom" id="image" style={{width: '110px', height: 'auto'}} src={logo} /></div>
//         <div className='paw'>
//           <div className="d-flex btn-group btn-group-toggle" data-toggle="buttons" style={{fontSize: '16px'}}><label className="justify-content-center align-items-center align-content-center align-self-center flex-wrap mx-auto btn btn-secondary active">&nbsp; &nbsp; LOGIN&nbsp; &nbsp;</label><label className="btn btn-secondary">REGISTER<input type="radio" name="options" defaultChecked /></label></div>
//         </div>
//         <div className="form-group" style={{fontSize: '15px'}}><input className="form-control" type="email" id="formum" placeholder="Username*" required minLength={6} maxLength={20} autoFocus /></div>
//         <div className="form-group"><input className="form-control" type="email" id="formum" style={{fontSize: '15px'}} placeholder="Email*" required minLength={5} maxLength={30} autoFocus /></div>
//         <div className="form-group"><input className="form-control" type="password" id="formum2" style={{fontSize: '15px'}} placeholder="Password*" required autoFocus /></div>
//         <div className="form-group"><input className="form-control" type="email" id="formum" style={{fontSize: '15px'}} placeholder="Business Name" autoFocus /></div>
//         <div className="form-group"><input className="form-control" type="email" id="formum" style={{fontSize: '15px'}} placeholder="Address" autoFocus /></div><button className="btn btn-light" id="butonas" style={{width: '100%', height: '100%', marginBottom: '0px', backgroundColor: 'rgba(44,49,52,0.82)', color: '#ffd700', paddingBottom: '6px'}} type="button">Signin</button></form>