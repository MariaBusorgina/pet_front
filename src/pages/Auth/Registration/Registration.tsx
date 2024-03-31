import {
    Avatar,
    Box,
    Button,
    Container,
    Grid,
    TextField,
    Typography
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {Link, useNavigate} from 'react-router-dom';
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {validationRegistrationScheme} from "../validators.ts";
import {TRegistrationForm} from "../types.ts";
import {useState} from "react";
import {axiosInstance} from "@/api";
import {LoadingSpinner} from "@/components/LoadingSpinner";


const Registration = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<TRegistrationForm>({
        resolver: yupResolver(validationRegistrationScheme) as never,
    })
    const onSubmit: SubmitHandler<TRegistrationForm> = async (dataForm) => {
        try {
            await axiosInstance.post('register/', {
                first_name: dataForm.first_name,
                last_name: dataForm.last_name,
                email: dataForm.email,
                password: dataForm.password,
            })

            setLoading(false)

            navigate('/auth/login')
        } catch (error) {
            setLoading(false)
            // TODO: handle errors
        }
        console.log('AAAA', dataForm)
    };

    console.log('eee', errors)

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
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
                    Зарегистрироваться
                </Typography>
                <Box sx={{mt: 3}}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    {...register("first_name")}
                                    helperText={errors.first_name?.message}
                                    fullWidth
                                    id="first_name"
                                    label="Имя"
                                    name="first_name"
                                    autoComplete="first_name"
                                    FormHelperTextProps={{style: {color: 'red', marginLeft: '2px'}}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    {...register("last_name")}
                                    helperText={errors.email?.message}
                                    fullWidth
                                    id="last_name"
                                    label="Фамилия"
                                    name="last_name"
                                    autoComplete="last_name"
                                    FormHelperTextProps={{style: {color: 'red', marginLeft: '2px'}}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    {...register("email")}
                                    helperText={errors.email?.message}
                                    fullWidth
                                    id="email"
                                    label="E-mail"
                                    name="email"
                                    autoComplete="email"
                                    FormHelperTextProps={{style: {color: 'red', marginLeft: '2px'}}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    {...register("password")}
                                    helperText={errors.password?.message}
                                    fullWidth
                                    name="password"
                                    label="Пароль"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    FormHelperTextProps={{style: {color: 'red', marginLeft: '2px'}}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    {...register("passwordConfirmation")}
                                    helperText={errors.passwordConfirmation?.message}
                                    fullWidth
                                    name="passwordConfirmation"
                                    label="Повторите пароль"
                                    type="password"
                                    id="passwordConfirmation"
                                    autoComplete="new-password"
                                    FormHelperTextProps={{style: {color: 'red', marginLeft: '2px'}}}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Зарегистрироваться
                        </Button>
                    </form>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/auth/login">
                                Уже есть аккаунт? Войти
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <LoadingSpinner loading={loading}/>
        </Container>
    )
};

export default Registration;
