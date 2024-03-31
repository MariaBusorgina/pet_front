import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {useAppDispatch, useAppSelector} from "@/hooks/redux/redux.ts";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import useLogout from "@/hooks/useLogout.ts";
import {LoadingSpinner} from "@/components/LoadingSpinner";
import {setUser} from "@/pages/Auth/AuthSlice.ts";
import {axiosPrivateInstance} from "@/api";

const User = () => {

    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const logout = useLogout()
    const navigate = useNavigate();
    const {
        first_name,
        last_name,
        email
    } = useAppSelector(state => state.authReducer.user);

    const onLogout = async () => {
        setLoading(true)

        await logout()
        navigate('/')
    }

    useEffect(() => {
        async function getUser() {
            const { data } = await axiosPrivateInstance.get('me/')
            dispatch(setUser(data));
        }

        getUser()
    }, [])

    return (
        <Container>
            <Typography variant={'h1'}>User</Typography>
            <Typography variant={"h3"}>Имя: {first_name}</Typography>
            <Typography variant={"h3"}>Фамилия: {last_name}</Typography>
            <Typography variant={"h3"}>Почта: {email}</Typography>
            <Button onClick={onLogout}>LOGOUT</Button>
            <LoadingSpinner loading={loading}/>
        </Container>
    );
};

export default User;
