import React,{useEffect,useState} from 'react'
import '../styles/dashboard.css'
import {useDispatch, useSelector} from 'react-redux'
import{startGetBills} from '../actions/billAction'
import{startGetProducts} from '../actions/productsAction'
import { startGetUsers } from '../actions/usersAction';
import { startGetCustomers } from '../actions/customersAction';
import { Pie } from 'react-chartjs-2';
import Card from "react-bootstrap/Card";
import ListGroup  from "react-bootstrap/ListGroup"
import {BarChart,XAxis,YAxis,Tooltip,Legend,Bar,CartesianGrid,Label, Sector, Cell, ResponsiveContainer ,AreaChart,Area} from 'recharts'
function Dashboard() {
    const bills=useSelector((state)=>{
        return state.bills
    })
    const d = new Date();
    const n = d.getMonth()+1;
    const r = d.getFullYear();
    const years={1:'Jan',2:'Feb',3:'Mar',4:'Apr',5:'May',6:'Jun',7:'Jul',8:'Aug',9:'Sept',10:'Oct',11:'Nov',12:'Dec'}
    const [monthBill,setMonthBill]=useState('')
    const [monthSum,setMonthSum]=useState('')
    const[month,setMonth]=useState(years[n])
    const[firstYear,setFirstYear]=useState(r)
    const [chartData,setChartData]=useState({}) 
    const customers=useSelector((state)=>{
        return state.customers
    })
    const products=useSelector((state)=>{
        return state.products
    })
   
    let a=[]
    let b={}//customer  frequency
    let c={}//product frquency
  //  const topProducts=bills.map()
    let mike=[...bills]
    let draken=[...customers]
    let manjiro=[...products]
   let sortMike= mike.sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0))
    let manjiroSort=manjiro.sort((a,b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0))
    let drakenSort=draken.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
  
    const [currDate,setCurrDate]=useState(n)
    useEffect(()=>{
        let kiwi=mike.filter((ele)=>{
            let t=ele.date.split('-')
           return( (Number(currDate)==Number(t[1]))&&(firstYear==Number(t[0])))
       })
       setMonthBill(kiwi)
       let sum=0//monthly income
       kiwi.forEach((ele)=>{
           sum+=ele.total
       })
       setMonthSum(sum)
       setMonth(years[currDate])
  
    },[currDate,firstYear])
    //overall monthly total
    const goku=mike.filter((ele)=>{
         let t=ele.date.split('-')
        return Number(currDate)==Number(t[1])
    })
    let sum=0//monthly income
goku.forEach((ele)=>{
    sum+=ele.total
})
    //customer frquency
    draken.forEach((ele)=>{
        b[ele.name]=0
        
    })
for( let i=0;i<mike.length;i++){
    let sd=mike[i].name
    // console.log('sd',sd)
    if(Object.keys(b).includes(sd)){
        b[sd]=b[sd]+1
    }

}
// let bus=0
// for (const x in b){
// if(b[x]>bus){
//     bus=x
// }
// }
const lowestCustomer = Object.keys(b).sort(function(a,c){return b[a]-b[c]})
const highestCustomer=lowestCustomer.reverse()
const topCustomers=highestCustomer.slice(0,5)
 const graphCustomer=[]
let idli2={}//graphdata customers
for(const x in b){
    for(let i=0;i< highestCustomer.length;i++){
        if(x==highestCustomer[i]){
        idli2['Name']=highestCustomer[i].toString()
        idli2['Visited']=b[x]
        graphCustomer.push(idli2)
        idli2={}
        }
    }
}
const graphCustomer1=graphCustomer.slice(0,5)
let revisitingCustomer=0
let customerOnce=0
graphCustomer.forEach((ele)=>{
  if(ele.Visited==1){
    customerOnce+=1
  }
  else if(ele.Visited>1){
    revisitingCustomer+=1
  }
})
//piechart
const chart=()=>{
  setChartData({
    labels:['Revisiting customers','customers visited once'],
    datasets:[
      {
        label: '# of Votes',
        data: [revisitingCustomer,customerOnce],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      }
    ]
  })
}
const gc2=graphCustomer.filter((ele)=>ele.hasOwnProperty('Name'))
//products frequency
let egg={}
let dee={}//linking id and product name to connect later
manjiro.forEach((ele)=>{
    dee[ele.name]=ele._id
})
manjiro.forEach((ele)=>{
    c[ele._id]=0
    
})
for( let i=0;i<mike.length;i++){
    for(let j=0;j<mike[i].lineItems.length;j++){
        let elbow=mike[i].lineItems
        if(Object.keys(c).includes(elbow[j].product)){
c[elbow[j].product]+=elbow[j].quantity
        }
    }}
for(const x in dee){
    for (const y in c){
        if(dee[x]== y){
       
        egg[x]=c[y]
    }
    
}

}
const sortEggs=Object.keys(egg).sort(function(a,c){return egg[a]-egg[c]})//products frequency sorted ascend
const highestProduct=sortEggs.reverse().slice(0,5)    
const graphProduct=[]
let idli={}//graph data products
for(const x in egg){
    for(let i=0;i< highestProduct.length;i++){
        if(x==highestProduct[i]){
        idli['Quantity']=egg[x]
        idli['Product']=highestProduct[i]
        graphProduct.push(idli)
        idli={}
        // let xmen={highestProduct[i]:egg[x]}
        //     graphProduct.push({highestProduct[i]:egg[x]})
        }
    }
}

const idliArray=[]
//customers revisting
  





//last 7 days income
const michael={}
sortMike.forEach((ele)=>{
  if(michael[ele.date]){
    michael[ele.date]+=ele.total
  }
  else{
    michael[ele.date]=ele.total
  }
})
let tyson=[]
let ray={}
for(const x in michael){
  ray['date']=x.toString().slice(0,10)
  ray ['income']=michael[x]
  tyson.push(ray)
  ray={}
}
tyson=tyson.slice(0,7)

// mike.forEach((ele)=>{
    //     a.forEach((e)=>{
    //         if(e==ele.name){
    //             [e]=a.e +1
    //         }
    //     })
    // })

    // const frequencyObj={}
    // customers.forEach((customer)=>{
    //     const customerOrders=customers.filter((c)=>{
    //         return c.Phone === customer.Phone
    //     })
    //     if(customerOrders.length >=5){
    //         frequencyObj['5+']++
    //     }
    //     else{
    //         frequencyObj[customerOrders.length]++
    //     }
    // })

    const dispatch=useDispatch()
    useEffect(()=>{

        dispatch(startGetBills())
        dispatch(startGetCustomers())
        dispatch (startGetProducts())
        dispatch(startGetUsers())
        let kiwi=mike.filter((ele)=>{
            let t=ele.date.split('-')
           return( (Number(currDate)==Number(t[1]))&&(firstYear==Number(t[0])))
       })
       setMonthBill(kiwi)
       let sum=0//monthly income
       kiwi.forEach((ele)=>{
           sum+=ele.total
       })
       setMonthSum(sum)
       setMonth(years[currDate])
       chart()

        
    },[])
    return (<div>
  
<h1>Dashboard</h1><hr/>
        <div className='cell'>
     
<div className='babycell'>

<Card
    bg='dark'
   
    text='white'
    
    className="mb-2"
  >
    <Card.Header><div>
    <input type='button' value='<<' onClick={()=>{setFirstYear(firstYear-1)}}/>&nbsp;{firstYear}&nbsp;<input type='button' value='>>'onClick={()=>{
    setFirstYear(firstYear+1)
    
    }}/>  
                </div>
                <input type='button' value='<<' onClick={()=>{setCurrDate(currDate-1)}}/>&nbsp;{month}&nbsp;<input type='button' value='>>'onClick={()=>{
    setCurrDate(currDate+1)
    
    }}/></Card.Header>
    <Card.Body>
      <Card.Title>Monthly Income </Card.Title>
      <Card.Text>
       {monthSum    }
      </Card.Text>
    </Card.Body>
  </Card>
  <Card
    bg='dark'
   
    text='white'
    
    className="mb-2"
  >
    <Card.Header>TOTAL BILLS</Card.Header>
    <Card.Body>
      <Card.Title>{mike.length} </Card.Title>
  
    </Card.Body>
  </Card>
  <Card
    bg='dark'
   
    text='white'
    
    className="mb-2"
  >
    <Card.Header>TOTAL CUSTOMERS</Card.Header>
    <Card.Body>
     
      <Card.Text>
   {draken.length}
      </Card.Text>
    </Card.Body>
  </Card>
  <Card
    bg='dark'
   
    text='white'
    
    className="mb-2"
  >
    <Card.Header>TOTAL PRODUCTS</Card.Header>
    <Card.Body>
      <Card.Title>{manjiro.length} </Card.Title>
    
    </Card.Body>
  </Card>

</div>   


<div className='babycell'><h3>Top 5 customers</h3><hr/><ResponsiveContainer width={230} height={380}>
<BarChart className='graph' width={230} height={380} data={graphCustomer1}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="Name" tick={false}/>
  <YAxis />
  <Tooltip />
  <Legend/>

  <Bar dataKey="Visited" fill="#b31504" />
 
</BarChart>
</ResponsiveContainer><br/>
<Card className='card' style={{ width: '15rem' }}>
  <Card.Header><b>CUSTOMER LEADERBOARD</b></Card.Header>
  <ListGroup variant="flush">
      {topCustomers.map((ele,id)=>{
          return(<ListGroup.Item>{id+1}. {ele}</ListGroup.Item>)
      })}
  
  </ListGroup>
</Card>
</div>


<div className='babycell'><h3>Top 5 Products</h3><hr/>
<ResponsiveContainer width={230} height={380}>
<BarChart className='graph' width={230} height={380} data={graphProduct}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="Product" tick={false}/>
  <YAxis />
  <Tooltip />
<Legend/>
  <Bar dataKey="Quantity" fill="#3aa10e" />
 
</BarChart>
</ResponsiveContainer><br/>
<Card className='card' style={{ width: '15rem' }}>
  <Card.Header> <b>FREQUENTLY BROUGHT PRODUCTS</b></Card.Header>
  <ListGroup variant="flush">
      {highestProduct.map((ele,id)=>{
          return(<ListGroup.Item>{id+1}. {ele}</ListGroup.Item>)
      })}
  
  </ListGroup>
</Card>

</div>
<div className='babycell'><h3>Last 7 days income </h3><hr/>
{/* <ResponsiveContainer width={230} height={380}>
     <BarChart className='graph' width={230} height={380} data={tyson}>
  <CartesianGrid strokeDasharray="3 3" />

  <YAxis />
  <Tooltip />
  <Legend/>
  <Bar dataKey="income" fill="#8884d8" />
 
</BarChart>
</ResponsiveContainer> */}
<div>
<ResponsiveContainer width={240}height={380}>
        <AreaChart className='graph' 
          width={240}
          height={380}
          data={tyson}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={false}/>
          <YAxis />
          <Legend/>
          <Tooltip />
          <Area type="monotone" dataKey="income" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
      
          <div id="dexter">


  <Pie className='graph' data={chartData} />
          </div>
</div>
         </div>   

        </div>
        </div>
    )
}

export default Dashboard
