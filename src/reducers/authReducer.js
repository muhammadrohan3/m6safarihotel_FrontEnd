const initialState = {
    user : null,
    path : ""
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
        case "SET_PATH":
            return {
                ...state , 
                path : action.payload
            }
        default : 
            return state
    }
}
