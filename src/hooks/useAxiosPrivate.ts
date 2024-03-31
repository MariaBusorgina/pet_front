import {axiosPrivateInstance} from "@/api";
import {useAppDispatch, useAppSelector} from "./redux/redux.ts";
import {useEffect} from "react";
import {setAccessToken} from "../pages/Auth/AuthSlice.ts";
import useRefreshToken from "./useRefreshToken.ts";

export default function useAxiosPrivate() {

    const dispatch = useAppDispatch();

    const {
        accessToken,
        csrftoken,
        user,
    } = useAppSelector(state => state.authReducer);

    const refresh = useRefreshToken();

    useEffect(() => {
        const requestIntercept = axiosPrivateInstance.interceptors.request.use(
            (config) => {
                if (!config.headers["Authorization"]) {
                    config.headers['Authorization'] = `Bearer ${accessToken}`;
                    config.headers['X-CSRFToken'] = csrftoken;
                }
                return config
            },
            (error) => Promise.reject(error)
        )

        const responseIntercept = axiosPrivateInstance.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if ((error?.response?.status === 403 || error?.response?.status === 401) && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const {csrfToken: newCSRFToken, accessToken: newAccessToken} = await refresh();
                    dispatch(setAccessToken(newAccessToken));
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    prevRequest.headers['X-CSRFToken'] = newCSRFToken;
                    return axiosPrivateInstance(prevRequest)
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivateInstance.interceptors.request.eject(requestIntercept)
            axiosPrivateInstance.interceptors.response.eject(responseIntercept)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken, user])

    return axiosPrivateInstance
}
