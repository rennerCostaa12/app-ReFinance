import { Navigate } from "react-router-dom"
import { useContext } from "react"
import { UsersContext } from "../contexts/AuthContext"

export default function ProtectedRoutes({ children }){
    const { authUser } = useContext(UsersContext);

    if(!authUser){
        return <Navigate to="/" replace />
    }

    return children
}