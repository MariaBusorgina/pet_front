import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import useRefreshToken from "@/hooks/useRefreshToken.ts";
import {useAppDispatch, useAppSelector} from "@/hooks/redux/redux.ts";
import useAxiosPrivate from "@/hooks/useAxiosPrivate.ts";
import {setUser} from "@/pages/Auth/AuthSlice.ts";
import {LoadingSpinner} from "../LoadingSpinner";

export default function PersistLogin() {

    const dispatch = useAppDispatch();
    const refresh = useRefreshToken();
    const { accessToken } = useAppSelector(state => state.authReducer);
    const [loading, setLoading] = useState(true);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let isMounted = true;

        async function verifyUser() {
            try {
                await refresh()
                const { data } = await axiosPrivate.get('me/')
                dispatch(setUser(data));
            } catch (error) {
                console.log(error)
            } finally {
                isMounted && setLoading(false)
            }
        }

        !accessToken ? verifyUser() : setLoading(false)

        return () => {
            isMounted = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        loading ? <LoadingSpinner loading={loading}/> : <Outlet />
    )
}
