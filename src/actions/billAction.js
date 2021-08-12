import axios from "axios"
import swal from "sweetalert"
export const startGetBills=()=>{

    return (dispatch,getState)=>{
        axios.get(`https://dct-billing-app.herokuapp.com/api/bills`,{
            headers: { 'Authorization':'Bearer '+ localStorage.getItem('token') }
        })
            .then((response)=>{
                const bills=response.data
                const t1=[...response.data]
                const t2=getState().customers
                let z=[]
                for (let i=0;i<t1.length;i++){
                    for(let j=0;j<t2.length;j++){
                        if(t1[i].customer ==t2[j]._id){
                            z.push({...t1[i],...{"name":t2[j].name}})
                
            }
          }
        }
            dispatch(setBills(z))
            
        })
            .catch((err)=>{
                alert(err.message)
        })
    }
}
export const setBills=(bills)=>{
    return {
        type:'SET_BILLS',
        payload:bills
    }
}

export const startSetBills=(formData)=>{
    
    return (dispatch,getState)=>{
        axios.post(`https://dct-billing-app.herokuapp.com/api/bills`,formData,{
            headers: { 'Authorization':'Bearer '+ localStorage.getItem('token') }
        })
            .then((response)=>{
                dispatch(addBill(response.data))
                dispatch(startGetBills())
               }            
        )
            .catch((err)=>{
                swal({
                    title: "Error!",
                    text: err.message,
                    icon: "error",
                    timer: 2000,
                    button: false
                  })
        
        })
    }
}
export const addBill=(formData)=>{
    return{
        type:'ADD_BILLS',
        payload:formData
    }
}

export const startDeleteBill=(id)=>{
    return (dispatch)=>{
        axios.delete(`https://dct-billing-app.herokuapp.com/api/bills/${id}`,{
            headers: { 'Authorization':'Bearer '+ localStorage.getItem('token') }
        })
            .then((response)=>{
                if(response.data.hasOwnProperty('errors')){
                    swal({
                        title: "Error!",
                        text: response.data.errors,
                        icon: "error",
                        timer: 2000,
                        button: false
                      })
               }
               else{
                dispatch(deleteBill(id))
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
    }
}
export const deleteBill=(id)=>{
    return{
        type:'DELETE_BILLS',
        payload:id
    }
}