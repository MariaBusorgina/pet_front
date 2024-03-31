import {axiosInstance} from "@/api";
import {useAppDispatch} from "./redux/redux.ts";
import {setAccessToken, setCSRFToken} from "../pages/Auth/AuthSlice.ts";

export default function useRefreshToken() {
    const dispatch = useAppDispatch();

    return async () => {
        const response = await axiosInstance.post('refresh-token/')
        dispatch(setAccessToken(response.data.access));
        dispatch(setCSRFToken(response.headers["x-csrftoken"]))

        return {accessToken: response.data.access, csrfToken: response.headers["x-csrftoken"]}
    };
}
