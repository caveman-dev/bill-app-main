import React, { useEffect, useState } from 'react'
import { startGetCustomers,startSetCustomers ,startDeleteCustomers} from '../actions/customersAction'
import {useDispatch, useSelector} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import swal from 'sweetalert'
import Swal from 'sweetalert2'
import '../styles/products.css'
import Button from '@material-ui/core/Button';
import FormDialog from './CustomerPopup'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
  
function Customers() {
    const [name,setName]=useState('')
    const [mobile,setMobile]=useState('')
    const [email,setEmail]=useState('')
    const [search,setSearch]=useState('')
    const [source,setSource]=useState(false)
    const [popup,setPopup]=useState(false)
    const[popupValue,setPopupValue]=useState('')
    const [popupPrice,setPopupPrice]=useState('')
    const [popupId,setPopupId]=useState('')
    const [popupEmail,setPopupEmail]=useState('')
    const useStyles = makeStyles({
        table: {
          minWidth: 260,
        },
      });
      const classes = useStyles();
    const dispatch=useDispatch()
    const customers=useSelector((state)=>{
        return state.customers
    })
    useEffect(()=>{
        dispatch(startGetCustomers())
    },[])
    function Alert(props) {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
  const handleEdit=(a)=>{
  setPopupValue(a.name)
  setPopupPrice(a.mobile)
  setPopupEmail(a.email)
  setPopupId(a._id)
  setPopup(true)
}
  const handleSearch=(e)=>{
    const b=e.target.value
    setSearch(b)
    const vandal=customers.filter((customer)=>{
      if(customer.name.toString().toLowerCase().includes(b.toString().toLowerCase())){
        return customer
            }
        })
        setSource(vandal)
    }
    const [open, setOpen] = useState(false);
    const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const handleSubmit=(e)=>{
        e.preventDefault()
        const formData={
            name:name,
            mobile:mobile,
            email:email
        }
        let a=undefined
        customers.forEach((ele)=>{
          if(name==ele.name){
            a=2
          }
          else{
            a=undefined
          }
          })
          if(a){
          swal({
                title: "Invalid Input!",
                text: "Customer already exists",
                icon: "info",
                timer: 2000,
                button: false
              })
          }
          else{
            if(!name||!mobile){
              swal({
                title: "Enter values!",
                text: "Please enter values before adding",
                icon: "info",
                timer: 2000,
                button: false
              })
          }
        else if(mobile.length!==10){
          swal({
                title: "Inavlid Mobile!",
                text: "Please enter a 10 digit Mobile Number",
                icon: "info",
                timer: 2000,
                button: false
              })
        }
        else{
          dispatch(startSetCustomers(formData))
        
          setOpen(true);
        }
  }      
}
    const handleDelete=(e)=>{
      Swal.fire({
        title: 'Do you want to Delete the record?',
      
        showCancelButton: true,
        confirmButtonText: `confirm`,
        
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(startDeleteCustomers(e.target.attributes.value.value))
          Swal.fire('Deleted!', '', 'success')
        } 
      })
        
    }
    return (
        <div className='crown'>
            <h2>Customers.</h2><hr/>
            <form  onSubmit={handleSubmit} id = 'butterCup'className="row gx-3 gy-2 align-items-center">
            <div><p class="font-weight-bold"><u>Add Customer.</u></p></div>     
            <div className="col-sm-3">
            <label className="visually-hidden" htmlFor="specificSizeInputName">Name*</label>
            <input type="text"  value={name} onChange={(e)=>setName(e.target.value)} className="form-control" id="specificSizeInputName" placeholder="Gusion" />
            </div>
            <div className="col-sm-3">
            <label className="visually-hidden" htmlFor="specificSizeInputGroupUsername">Mobile*</label>
            <input value={mobile} onChange={(e)=>setMobile(e.target.value)} type="number" className="form-control" id="specificSizeInputName" placeholder="8698714455" />
            </div>
            <div className="col-sm-3">
            <label className="visually-hidden" htmlFor="specificSizeInputName">Email</label>
            <input type="email"  value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" id="specificSizeInputName" placeholder="darkMagician@ml.com" />
            </div>
            <div className="col-auto">
            <button type="submit" className="btn btn-primary">Add</button>
              <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success">
              Customer Added!
              </Alert>
              </Snackbar>
            </div>
            </form>
            <div id='blossom'>   
                <div id='lo1'className="col-sm-3">
                <label className="visually-hidden" htmlFor="specificSizeInputName"><p class="font-weight-bold"><u>Filter Customers.</u></p></label>
                  <div className="input-group">
                  <div id='bubbles' className="input-group-text"><box-icon color='white' name='search-alt' ></box-icon></div>
                  <input type="text" value={search} onChange={handleSearch}  className="form-control" id="specificSizeInputName" placeholder="Patrick Jane" />
                </div>
            </div>
            <div id='lo2'className="col-sm-3">
            </div>
            </div> 
            <div id='count'><p class="font-weight-bold">Total Customers : {customers.length}</p></div>
            <div>
            {
            <TableContainer className='table' component={Paper}>
            <Table className={classes.table} aria-label="simple table">
            <TableHead>
            <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Mobile</TableCell>
            <TableCell align="left">Options</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {
              source?(
                  source.map((ele,i)=>{
                      return(
                          <TableRow key={ele._id} >
                              <TableCell component="th" scope="row">{i+1}</TableCell>
                              <TableCell>{ele.name.toString().trim()}</TableCell>
                              <TableCell>{ele.mobile}</TableCell>
                              <TableCell>
                                <button className="btn-xs btn-dark" data-bs-toggle="tooltip" data-bs-placement="right" title="Delete" onClick={handleDelete} value={ele._id}><box-icon type='solid'color='white' name='trash-alt'></box-icon></button>&nbsp;
                                <button className="btn-xs btn-dark"  data-bs-toggle="tooltip" data-bs-placement="right" title="Edit" onClick={()=>handleEdit(ele)} value={ele._id}><box-icon type='solid' color='white' name='edit'></box-icon></button> </TableCell>
                                {popup&& <FormDialog key={ele._id} popupId={popupId} popupValue={popupValue} popupPrice={popupPrice} popup={popup} setPopup={setPopup}/>}
                          </TableRow>
                  )
                  })
              ):(
                  customers&&customers.map((ele,i)=>{
                      return(
                          <TableRow  key={ele._id}>
                              <TableCell component="th" scope="row">{i+1}</TableCell>
                              <TableCell>{ele.name.toString().trim()}</TableCell>
                              <TableCell>{ele.mobile}</TableCell>
                              <TableCell>
                                <button className="btn-xs btn-dark"  data-bs-toggle="tooltip" data-bs-placement="right" title="Delete" onClick={handleDelete} value={ele._id}><box-icon type='solid'color='white' value={ele._id} name='trash-alt'></box-icon></button>&nbsp;
                                &nbsp;
                                <button className="btn-xs btn-dark"  data-bs-toggle="tooltip" data-bs-placement="right" title="Edit" onClick={()=>handleEdit(ele)} value={ele._id}><box-icon type='solid' color='white' name='edit'></box-icon></button>
                              </TableCell>
                              {popup&& <FormDialog key={ele._id} popupEmail={popupEmail} popupId={popupId} popupValue={popupValue} popupPrice={popupPrice} popup={popup} setPopup={setPopup}/>}
                          </TableRow>
                  )
                  })
              )
     }
    </TableBody>
    </Table>
    </TableContainer>
     }        
    </div>
    </div>
    )
}

export default Customers
