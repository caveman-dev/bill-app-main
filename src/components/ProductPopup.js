import React,{useState,useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useDispatch, useSelector} from 'react-redux'
import swal from 'sweetalert'
import { startUpdateProducts } from '../actions/productsAction';

export default function FormDialog({popupValue,popupPrice,popupId,popup,setPopup}) {
  // window.location.reload()
  const [name1,setName]=useState(popupValue)
  const [price1,setPrice]=useState(popupPrice)
  const dispatch=useDispatch()
  const handleClose = () => {
    setPopup(false);
  };
  const handleEdit=()=>{
    const formData={
        name:name1,
        price:price1
    }
dispatch(startUpdateProducts(popupId,formData))
swal({
  title: "Updated",
  icon: "success",
  timer: 2000,
  button: false
})
setName('')
setPrice('')
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
            value={name1}
            type="text"
            onChange={(e)=>setName(e.target.value)}
            fullWidth
          >{popupValue}</TextField>
          <label>Price</label>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={popupPrice}
            type="text"
            onChange={(e)=>setPrice(e.target.value)}
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
