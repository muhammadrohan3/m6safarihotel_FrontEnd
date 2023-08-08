import { useEffect , useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar';
import { getUser } from '../actions/authActions'

function ProtectedRoutes() {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
   
    const isAuthenticated = () => {
        if (!user && localStorage.getItem('access_token') && Number(localStorage.getItem('expires_at')) > new Date().getTime()) {        
            return true;
        }
        else if (localStorage.getItem('access_token') && Number(localStorage.getItem('expires_at')) > new Date().getTime()) {
            return true;
        }
        else {
            dispatch({ type: "LOGOUT" })
            return false;
        }
    }
    return (
        <div>
            <>
                {isAuthenticated() ? <>
                    <Outlet />
                </> : <Navigate to="/login" />}
            </>
        </div>
    )
}

export default ProtectedRoutes