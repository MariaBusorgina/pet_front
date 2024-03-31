import { Navigate, Outlet, useLocation } from "react-router-dom"
import {useAppSelector} from "../hooks/redux/redux.ts";

const AuthMiddleware = () => {
    const { accessToken } = useAppSelector(state => state.authReducer);
    const location = useLocation()

    return (accessToken ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />)
};

export default AuthMiddleware;
