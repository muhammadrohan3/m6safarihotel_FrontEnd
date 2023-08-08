import axios from '../utils/axios'

export const getUser = () => {
    return async (dispatch) => {
    try {
        axios.post('/users/getUser', {token : localStorage.getItem('access_token')})
            .then(res => {
               
                dispatch({type : "LOGIN", payload : res.data.user})
                
                })
            .catch(err => {
                console.log(err)
                
            })
    } catch (error) {
        console.log(error)
    }
}
}