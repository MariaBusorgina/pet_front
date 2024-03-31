import {axiosPrivateInstance} from "@/api";
import {useAppDispatch} from "./redux/redux.ts";
import {setAccessToken, setCSRFToken, setUser} from "../pages/Auth/AuthSlice.ts";

export default function useLogout() {

    const dispatch = useAppDispatch();
    return async () => {
        try {
            await axiosPrivateInstance.post("auth/logout");

            dispatch(setAccessToken(null));
            dispatch(setCSRFToken(null));
            dispatch(setUser({}));

        } catch (error) {
            console.log(error);
        }
    }
}
