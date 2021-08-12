import axios from "axios"

export const startGetCustomers=()=>{
    return (dispatch)=>{
        axios.get(`https://dct-billing-app.herokuapp.com/api/customers`,{
            headers: { 'Authorization':'Bearer '+ localStorage.getItem('token') }
        })
            .then((response)=>{
                const customers=response.data
                dispatch(setCustomers(customers))
        })
            .catch((err)=>{
                alert(err.message)
        })
    }
}
export const startSetCustomers=(formData)=>{

    return (dispatch)=>{
        axios.post(`https://dct-billing-app.herokuapp.com/api/customers`, formData,{
            headers: { 'Authorization':'Bearer '+ localStorage.getItem('token') }
        })
            .then((response)=>{
               if(response.data.hasOwnProperty('errors')){
                    alert(response.data.errors)
               }
               else{
                    dispatch(addCustomers(response.data))
               }
        })
            .catch((err)=>{
                alert(err.message)
        })
    }
}
export const startDeleteCustomers=(id)=>{

    return (dispatch)=>{
        axios.delete(`https://dct-billing-app.herokuapp.com/api/customers/${id}`,{
            headers: { 'Authorization':'Bearer '+ localStorage.getItem('token') }
        })
            .then((response)=>{
               if(response.data.hasOwnProperty('errors')){
                    alert(response.data.errors)
               }
               else{
                dispatch(deleteCustomers(id))
              }
        })
            .catch((err)=>{
                alert(err.message)
        })
    }
}
export const startUpdateCustomers=(id,formData)=>{

    return (dispatch,getState)=>{
        axios.put(`https://dct-billing-app.herokuapp.com/api/customers/${id}` , formData ,{
            headers: { 'Authorization':'Bearer '+ localStorage.getItem('token') }
        })
            .then((response)=>{
               if(response.data.hasOwnProperty('errors')){
                    alert(response.data.errors)
               }
               else{
                   const a=[]
                   getState().customers.forEach((ele)=>{
                       if (ele._id!==id){
                           a.push(ele)
                       }
                       else{
                           ele.name=formData.name
                           ele.mobile=formData.mobile
                           ele.email=formData.email
                           a.push(ele)

                       }
                   })
                dispatch(updateCustomers(a))
              }
        })
            .catch((err)=>{
            alert(err.message)
        })
    }
}
export const setCustomers=(customers)=>{
    return {
        type:'SET_CUSTOMERS',
        payload:customers
    }
}
export const addCustomers=(formData)=>{
    return{
        type:'ADD_CUSTOMERS',
        payload:formData
    }
}
export const deleteCustomers=(id)=>{
    return{
        type:'DELETE_CUSTOMERS',
        payload:id
    }
}
export const updateCustomers=(value)=>{
    return{
        type:'UPDATE_CUSTOMERS',
        payload:value
    }
}