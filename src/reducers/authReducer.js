const initialState = {
    user : null,
}

export const authReducer = (state = initialState , action) =>{
    switch(action.type){
        case "LOGIN" : 
            return {
                ...state,
                user : action.payload
            }
        case "LOGOUT" : 
            localStorage.removeItem("access_token")
            return {
                ...state,
                user : null
            }
        default : 
            return state
    }
}
