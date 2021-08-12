import React,{useState,useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useDispatch, useSelector} from 'react-redux'
import { startUpdateCustomers } from '../actions/customersAction';
import swal from 'sweetalert'
export default function FormDialog({popupEmail,popupValue,popupPrice,popupId,popup,setPopup}) {
    const [name,setName]=useState(popupValue)
    const [mobile,setMobile]=useState(popupPrice)
    const [email,setEmail]=useState(popupEmail)
    const dispatch=useDispatch()
    const id=popupId

  const handleClose = () => {
    setPopup(false);
    console.log('butttt',name)
  };
  const handleEdit=()=>{
      console.log(id)
      const formData={
        name:name,
        mobile:mobile,
        email:email
    }

dispatch(startUpdateCustomers(id,formData))
swal({
  title: "Updated",
  icon: "success",
  timer: 2000,
  button: false
})
setName('')
setMobile('')
setEmail('')
handleClose()
  }

  return (
    <div>
     
      <Dialog open={popup} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit</DialogTitle>
        <DialogContent>
          <label>Name</label>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={name}
            type="text"
            onChange={(e)=>setName(e.target.value)}
            fullWidth
         >{popupValue}</TextField>
          <label>Mobile</label>
          <TextField
            autoFocus
            type='number'
            margin="dense"
            id="name"
            value={mobile}
            type="text"
            onChange={(e)=>setMobile(e.target.value)}
            fullWidth
         >{popupPrice}</TextField>
          <label>Email</label>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            type="text"
            fullWidth
          >{popupPrice}</TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEdit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
