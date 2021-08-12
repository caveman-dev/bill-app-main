import axios from "axios"

export const startGetProducts=()=>{

    return (dispatch)=>{
        axios.get(`https://dct-billing-app.herokuapp.com/api/products`,{
            headers: { 'Authorization':'Bearer '+ localStorage.getItem('token') }
        })
            .then((response)=>{
            const products=response.data
            dispatch(setProducts(products))
        })
            .catch((err)=>{
            alert(err.message)
        })
    }
}
export const startSetProducts=(formData)=>{

    return (dispatch)=>{
        axios.post(`https://dct-billing-app.herokuapp.com/api/products`,formData,{
            headers: { 'Authorization':'Bearer '+ localStorage.getItem('token') }
        })
            .then((response)=>{
                if(response.data.hasOwnProperty('errors')){
                    alert(response.data.errors)
               }
               else{
                    dispatch(addProducts(response.data))
               }
            
        })
            .catch((err)=>{
            alert(err.message)
        })
    }
}
export const startDeleteProducts=(id)=>{

    return (dispatch)=>{
        axios.delete(`https://dct-billing-app.herokuapp.com/api/products/${id}`,{
            headers: { 'Authorization':'Bearer '+ localStorage.getItem('token') }
        })
            .then((response)=>{
                dispatch(deleteProducts(id))           
        })
            .catch((err)=>{
                alert(err.message)
        })
    }
}
export const startUpdateProducts=(id,formData)=>{

    return (dispatch,getState)=>{
        axios.put(`https://dct-billing-app.herokuapp.com/api/products/${id}` , formData ,{
            headers: { 'Authorization':'Bearer '+ localStorage.getItem('token') }
        })
            .then((response)=>{
               if(response.data.hasOwnProperty('errors')){
                    alert(response.data.errors)
               }
               else{
                   const a=[]
                   getState().products.forEach((ele)=>{
                       if (ele._id!==id){
                           a.push(ele)
                       }
                       else{
                           ele.name=formData.name
                           ele.price=formData.price
                           a.push(ele)
                       }
                   })
                dispatch(updateProducts(a))
              }
        })
            .catch((err)=>{
            alert(err.message)
        })
    }
}
export const setProducts=(products)=>{
    return {
        type:'SET_PRODUCTS',
        payload:products
    }
}
export const addProducts=(formData)=>{
    return{
        type:'ADD_PRODUCTS',
        payload:formData
    }
}
export const deleteProducts=(id)=>{
    return{
        type:'DELETE_PRODUCTS',
        payload:id
    }
}
export const updateProducts=(value)=>{
    return{
        type:'UPDATE_PRODUCTS',
        payload:value
    }
}