import axios from "axios"

export const startGetUsers=()=>{

    return (dispatch)=>{
        axios.get(`https://dct-billing-app.herokuapp.com/api/users/account`,{
            headers: { 'Authorization':'Bearer '+ localStorage.getItem('token') }
        })
            .then((response)=>{
            const users=response.data
            dispatch(setUsers([users]))
        })
            .catch((err)=>{
            alert(err.message)
        })
    }
}

export const setUsers=(users)=>{
    return {
        type:'SET_USERS',
        payload:users
    }
}
