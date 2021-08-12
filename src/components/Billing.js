import React, { useState,useEffect } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import {useDispatch, useSelector} from 'react-redux'
import{startGetBills,startSetBills,startDeleteBill} from '../actions/billAction'
import { startGetCustomers } from '../actions/customersAction';
import swal from 'sweetalert'
import Swal from 'sweetalert2'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FormDialog from './BillingPopup';
import{startGetProducts} from '../actions/productsAction'
import { startGetUsers } from '../actions/usersAction';

function Billing() {
  const hello=Number(new Date())
  const [inputFields, setInputFields] = useState([
    { id:hello, product: '', quantity: '' },
  ]);
  const [name,setName]=useState('')
  const [main,setMain]=useState([])
  const [queen,setQueen]=useState(true)
  const [search,setSearch]=useState('')
  const [popup,setPopup]=useState(false)
  const [source,setSource]=useState(false)
  const [prudct,setPruduct]=useState([{id:hello, product:"",quantity:" "}])
  const [costomer,setCostomer]=useState('')
  const [bill,setBills]=useState('')
  const useStyles = makeStyles({
    table: {
      minWidth: 260,
    },
  });
  const classes = useStyles();
  const bills=useSelector((state)=>{
    return state.bills
  })
  const customers=useSelector((state)=>{
    return state.customers
  })
  const products=useSelector((state)=>{
    return state.products
  })
  const productsList=products.map((ele)=>{
    return ele.name
  })
  let aaa=[...bills]
  const dispatch=useDispatch()
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();
  today = dd + '-' + mm + '-' + yyyy;

const [judge,setJudge]=useState(today)

   useEffect(()=>{
        dispatch(startGetBills())
        dispatch(startGetCustomers())
        dispatch (startGetProducts())
        dispatch(startGetUsers())
    },[])
  const handlePrudct=(id,a)=>{
 
   
    const newInputFields1 = prudct.map(i => {
      if(id === i.id) {
        i.product = a
      }
      return i;
    })
    setPruduct(newInputFields1)
  }
  const handleCostomer=(e)=>{
    setName(e.target.value)
    let a
    customers.forEach((ele)=>{
      if(ele._id==e.target.value){
        a=ele.name
      }
    })
    setCostomer(a)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData={
        date:judge,
        customer:name,
        lineItems: inputFields,
       
    }
    if(judge&&name&&inputFields){
      dispatch(startSetBills(formData))
      dispatch(startGetBills())
      setPruduct([{id:hello, product:" ",quantity:" "}])
      setInputFields([{id:hello, product:" ",quantity:" "}])
      setName('')
      setJudge("")
      swal({
        title: "Bill Created!",
        icon: "success",
        timer: 2000,
        button: false
      })
    }
    else{
      swal({
        title: "Enter value!",
        text: "enter values before submitting",
        icon: "info",
        timer: 2000,
        button: false
      })
    }
  };
  const handleSearch=(e)=>{
    const b=e.target.value
    setSearch(b)
    const vandal=bills.filter((bill)=>{
        if(bill.name.toString().toLowerCase().includes(b.toString().toLowerCase())){
            return bill
        }
    })
    setSource(vandal) 
}

  const handleChangeInput = (id, e) => {
    const newInputFields = inputFields.map(i => {
      if(id === i.id) {
        i[e.target.name] = e.target.value
      }
      return i;
    })
    if(e.target.name=='product'){
      let a
      products.forEach((ele)=>{
        if(ele._id==e.target.value){
          a=ele.name
        }
      })
        handlePrudct(id,a)
    }
    setInputFields(newInputFields);
  }

  const handleAddFields = () => {
    const id=Number(new Date())
    setInputFields([...inputFields, { id: id,  product: '', quantity: '' }])
    setPruduct([...prudct,{id:id,product:"",quantity:""}])
  }


  const handleRemoveFields = id => {
    const values  = [...inputFields];
    values.splice(values.findIndex(value => value.id === id), 1);
    setInputFields(values);
  }
  const handleDelete=(e)=>{
    Swal.fire({
      title: 'Do you want to Delete the record?',
    
      showCancelButton: true,
      confirmButtonText: `confirm`,
      
    }).then((result) => {
        if (result.isConfirmed) {
          dispatch(startDeleteBill(e.target.attributes.value.value))
          Swal.fire('Deleted!', '', 'success')
      } 
    })
 }
 const handleEdit=(ele)=>{
   setBills(ele)
   setPopup(true)
 }
    return (
        <div>
          <Container>
            <h2>Bills.</h2><hr/>
            <div>
            <form id = 'butterCup'className="row gx-3 gy-2 align-items-center">
              <div>       
                <p class="font-weight-bold"><u>Create Bill.</u></p></div> 
                  <div>
   
              </div>    
   <div className="col-sm-3">
  <label className="visually-hidden" htmlFor="specificSizeInputGroupUsername"><u>Add products and quantity</u> </label>
          {inputFields.map((inputField,i,a=prudct[i]) => (
          <div key={inputField.id} >               
                <input type="text"  value={prudct[i].product} name="product"  onChange={event => handleChangeInput(inputField.id, event)} list="exampleList2" className="form-control" id="specificSizeInputName" placeholder="Product Name" />
          <datalist id="exampleList2" onChange={event => handleChangeInput(inputField.id, event)}>
        {
          products&& products.map((ele)=>{
                return <option  key={ele._id} value={ele._id}>{ele.name}</option>
            })
        }
          </datalist>
          <br/>
          <input type="number" name='quantity' value={inputField.quantity} onChange={event => handleChangeInput(inputField.id, event)} className="form-control" id="specificSizeInputName" placeholder="Quantity" />

            <IconButton className='symbol' disabled={inputFields.length === 1} onClick={() => handleRemoveFields(inputField.id)}>
              <RemoveIcon className='symbol' />
            </IconButton>
            <IconButton className='symbol'
              onClick={handleAddFields}>
              <AddIcon className='symbol' />
            </IconButton>
          </div>
        )) }
        </div>
        <div className="col-sm-3">
          <label className="visually-hidden" htmlFor="specificSizeInputName">Date</label>
          <input type="text" className="form-control" type="date" name="begin" 
        placeholder="dd-mm-yyyy" value={judge} onChange={(e)=>setJudge(e.target.value)}
        min="2000-12-31" max="2030-12-31" id="specificSizeInputName"  />
        </div>
        <div className="col-sm-3">
          <label className="visually-hidden" htmlFor="specificSizeInputGroupUsername">Customer Name</label>
          <input type="text" value={costomer} name="example" onChange={handleCostomer} list="exampleList"  className="form-control" id="specificSizeInputName"  />
          <datalist id="exampleList" onChange={handleCostomer}>
        {
           customers.map((ele)=>{
                return <option key={ele._id} value={ele._id}>{ele.name}</option>
            })
        }
          </datalist>       
        </div>
        <div className="col-sm-3"></div>
        <div className="col-auto">
          <button type="submit"  onClick={handleSubmit} className="btn btn-primary">Generate Bill</button>
        </div>
      </form>
           <div id='blossom'>
               
                <div id='lo1'className="col-sm-3">
                <label className="visually-hidden" htmlFor="specificSizeInputName"><p class="font-weight-bold"><u>Search</u></p></label>
                    <div className="input-group">
                        <div id='bubbles' className="input-group-text"><box-icon color='white' name='search-alt' ></box-icon></div>
                        <input type="text"  value={search} onChange={handleSearch} className="form-control" id="specificSizeInputName" placeholder="Jane Doe" />
                        </div>
         
                    </div>
        <div id='lo2'className="col-sm-3">
        </div>
            </div> 
      </div>
    </Container>
    <div id='count'><p class="font-weight-bold">Total Customer : {bills.length}</p></div>
    <div>
      {
         <TableContainer className='table' component={Paper}>
         <Table className={classes.table} aria-label="simple table">
           <TableHead>
             <TableRow>
               <TableCell>ID</TableCell>
               <TableCell align="left">Customer Name</TableCell>
               <TableCell align="left">Total</TableCell>
               <TableCell align="left">options</TableCell>
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
                                 <TableCell>{ele.name}</TableCell>
                                 <TableCell>{ele.total}</TableCell>
                                 <TableCell><button className="btn-xs btn-dark" onClick={handleDelete} value={ele._id}><box-icon type='solid'color='white' value={ele._id} name='trash-alt'></box-icon></button>&nbsp;   <button  data-bs-toggle="tooltip" data-bs-placement="right" title="More Info" className="btn-xs btn-dark" onClick={()=>setPopup(true)} value={ele._id}><box-icon type='solid'color='white'  name='detail'></box-icon></button></TableCell>
                                {popup&&<FormDialog bill={ele} popup={popup} setPopup={setPopup}/>}
                            </TableRow>
                    )
                    })
                ):(
                    bills&&bills.map((ele,i)=>{
                        return(
                            <TableRow key={ele._id}>
                                <TableCell component="th" scope="row">
                                 {i+1}
                                 </TableCell>
                                 <TableCell>{ele.name}</TableCell>
                                <TableCell>{ele.total}</TableCell>
                                <TableCell><button className="btn-xs btn-dark" onClick={handleDelete} value={ele._id}><box-icon type='solid'color='white' value={ele._id} name='trash-alt'></box-icon></button>&nbsp;   <button  data-bs-toggle="tooltip" data-bs-placement="right" title="More Info" className="btn-xs btn-dark" onClick={()=>handleEdit(ele)} value={ele._id}><box-icon type='solid'color='white'  name='detail'></box-icon></button></TableCell>
                                {popup&&<FormDialog key={ele._id} bill={bill} popup={popup} setPopup={setPopup}/>}
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
export default Billing





