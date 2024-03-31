import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {validationLoginScheme} from "../validators.ts";
import {TLoginForm} from "../types.ts";
import {useState} from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import {Button, Checkbox, FormControlLabel, Grid, TextField} from "@mui/material";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {axiosInstance} from "@/api";
import {useAppDispatch} from "@/hooks/redux/redux.ts";
import {setAccessToken, setCSRFToken} from "../AuthSlice.ts";
import {LoadingSpinner} from "@/components/LoadingSpinner";

const Login = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation()
    const fromLocation = location?.state?.from?.pathname || '/user'
    const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<TLoginForm>({
        resolver: yupResolver(validationLoginScheme) as never,
    });

    const onSubmit: SubmitHandler<TLoginForm> = async (dataForm) => {

        setLoading(true)

        try {
            const response = await axiosInstance.post('login/', dataForm);
            dispatch(setAccessToken(response?.data?.access_token))
            dispatch(setCSRFToken(response.headers["x-csrftoken"]))
            setLoading(false)

            navigate(fromLocation, {replace: true});
        } catch (error) {
            setLoading(false)
            // TODO: handle errors
            console.error('Error during login:', error);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    position: 'relative',
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Вход
                </Typography>
                <Box sx={{mt: 1}}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            {...register("email")}
                            helperText={errors.email?.message}
                            margin="normal"
                            fullWidth
                            label="E-mail"
                            autoFocus
                            FormHelperTextProps={{style: {color: 'red', marginLeft: '2px'}}}
                        />
                        <TextField
                            {...register("password")}
                            helperText={errors.password?.message}
                            margin="normal"
                            fullWidth
                            label="Пароль"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            FormHelperTextProps={{style: {color: 'red', marginLeft: '2px'}}}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Запомнить меня"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Войти
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link to="/auth/registration">
                                    {"Нет аккаунта? Зарегистрироваться"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                    <LoadingSpinner loading={loading}/>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
