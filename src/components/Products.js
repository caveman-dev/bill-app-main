import React, { useEffect, useState } from 'react'
import { startGetProducts,startSetProducts,startDeleteProducts } from '../actions/productsAction'
import {useDispatch, useSelector} from 'react-redux'
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import 'boxicons'
import swal from 'sweetalert'
import Snackbar from '@material-ui/core/Snackbar';
import Swal from 'sweetalert2'
import FormDialog from './ProductPopup'
import '../styles/products.css'
function Products() {
    const [name,setName]=useState('')
    const [price,setPrice]=useState('')
    const [search,setSearch]=useState('')
    const [source,setSource]=useState(false)
    const [popup,setPopup]=useState(false)
    const[popupValue,setPopupValue]=useState('')
    const [popupPrice,setPopupPrice]=useState('')
    const [popupId,setPopupId]=useState('')
    const useStyles = makeStyles({
        table: {
          minWidth: 260,
        },
      });
      const classes = useStyles();
    const dispatch=useDispatch()
    const products=useSelector((state)=>{
        return state.products
    })

    function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const handleEdit=(a)=>{
  setPopupValue(a.name)
  setPopupPrice(a.price)
  setPopupId(a._id)
  setPopup(true)
  

}
    useEffect(()=>{
        dispatch(startGetProducts())
    },[])
    const handleSearch=(e)=>{
        const b=e.target.value
        setSearch(b)
        const vandal=products.filter((product)=>{
            if(product.name.toString().toLowerCase().includes(b.toString().toLowerCase())){
                return product
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
            price:price
        }
        let a=undefined
  products.forEach((ele)=>{
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
                text: "Product already exists",
                icon: "info",
                timer: 2000,
                button: false
              })
    }
    else{
       if(name&&price){
            dispatch(startSetProducts(formData))
           
            setOpen(true);
        }
        else{
            swal({
                title: "Enter values!",
                text: "Please enter values before adding",
                icon: "info",
                timer: 2000,
                button: false
              })
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
              dispatch(startDeleteProducts(e.target.attributes.value.value))
              Swal.fire('Deleted!', '', 'success')
            } 
          })
    }
    return (
        <div>
            <h2>Products.</h2><hr/>
             <form onSubmit={handleSubmit} id = 'butterCup'className="row gx-3 gy-2 align-items-center">
        <div><p class="font-weight-bold"><u>Add Products.</u></p></div>     
        <div className="col-sm-3">
          <label className="visually-hidden" htmlFor="specificSizeInputName">Product Name</label>
          <input type='text' value={name} onChange={(e)=>setName(e.target.value)}  className="form-control" id="specificSizeInputName" placeholder="pen" />
        </div>
        <div className="col-sm-3">
          <label className="visually-hidden" htmlFor="specificSizeInputGroupUsername">Price</label>
          <input type="number" value={price} onChange={(e)=>setPrice(e.target.value)} className="form-control" id="specificSizeInputName" placeholder=" &#8377;" />
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-primary">Add</button>
           <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
         Product Added!
        </Alert>
      </Snackbar>
        </div>
      </form>
           <div id='blossom'>
                <div id='lo1'className="col-sm-3">
                <label className="visually-hidden" htmlFor="specificSizeInputName"><p class="font-weight-bold"><u>Filter Products.</u></p></label>
                    <div className="input-group">
                        <div id='bubbles' className="input-group-text"><box-icon color='white' name='search-alt' ></box-icon></div>
                        <input value={search} onChange={handleSearch} type="text" className="form-control" id="specificSizeInputName" placeholder="Jane Doe" />
                        </div>
                    </div>
        <div id='lo2'className="col-sm-3">
        </div>
            </div> 
      <div id='count'><p class="font-weight-bold">Total Products : {products.length}</p></div>
            <div>
            {
      <TableContainer className='table' component={Paper}>
      <Table className={classes.table} aria-label="simple table">
      <TableHead>
      <TableRow>
      <TableCell>ID</TableCell>
      <TableCell align="left">Name</TableCell>
      <TableCell align="left">Price</TableCell>
      <TableCell align="left">Options</TableCell>
     </TableRow>
   </TableHead>
   <TableBody>
     {
         source?(
            source.map((ele,i)=>{
                return(
                    <TableRow key={ele._id} >
                         <TableCell component="th" scope="row">
                         {i+1}
                         </TableCell>
                         <TableCell>{ele.name.toString().trim()}</TableCell>
                        <TableCell>{ele.price}</TableCell>
                        <TableCell><button className="btn-xs btn-dark" onClick={handleDelete} value={ele._id}><box-icon type='solid'color='white' value={ele._id} name='trash-alt'></box-icon></button>&nbsp; 
                         <button className="btn-xs btn-dark" onClick={()=>handleEdit(ele)} value={ele._id}><box-icon type='solid' color='white' name='edit'></box-icon></button></TableCell>
                         {popup&& <FormDialog key={ele._id} popupId={popupId} popupValue={popupValue} popupPrice={popupPrice} popup={popup} setPopup={setPopup}/>}
                    </TableRow>
            )
            })
        ):(
            products&&products.map((ele,i)=>{
                return(
                    <TableRow key={ele._id}>
                        <TableCell component="th" scope="row">
                         {i+1}
                         </TableCell>
                         <TableCell>{ele.name.toString().trim()}</TableCell>
                        <TableCell>{ele.price}</TableCell>
                        <TableCell><button className="btn-xs btn-dark" onClick={handleDelete} value={ele._id}><box-icon type='solid'color='white' value={ele._id} name='trash-alt'></box-icon></button>&nbsp;   
                        <button className="btn-xs btn-dark" onClick={()=>handleEdit(ele)} value={ele._id}><box-icon type='solid' color='white' name='edit'></box-icon></button></TableCell>
                       {popup&& <FormDialog key={ele._id} popupId={popupId} popupValue={popupValue} popupPrice={popupPrice} popup={popup} setPopup={setPopup}/>}
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

export default Products
