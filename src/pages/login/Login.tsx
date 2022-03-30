import React, { useRef, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';
import firebase from '../../firebase/firebaseConfig';
import { firebaseLogin } from '../../firebase/auth';
import { login, selectUser } from '../../slices/userSlice';
import "./login.css";
import LoadingButton from '@mui/lab/LoadingButton';

interface State {
    email: string;
    password: string;
    showPassword: boolean;
}

const Login = (props: any) => {

    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const location = useLocation();
    const _isMounted = useRef(true);


    const dispatch = useDispatch();
    const [password, setPassword] = useState<string>('');
    const [fieldVal, setFieldVal] = useState('password');
    const [loading, setLoading] = useState(false);
    const [showPassword, setPasswordVisibility] = useState(false);

    const loginUser = (e: any) => {
        setLoading(true);
        e.preventDefault();

        if (email === '' || password === '') {
            alert("Email or password field cannot be empty");
            return;
        } else {

            let userResult = firebaseLogin(email, password);
            userResult.then((data) => {
                dispatch(login({
                    email: data?.email,
                    uid: data?.uid,
                    displayName: data?.displayName
                }))
            })
                .then(() => {
                    setLoading(false);
                    navigate('/');
                })
                .catch(error => alert(error.message)); //Replace with modal message?
        }
        // login(email, password);
    }

    const [values, setValues] = useState<State>({
        email: '',
        password: '',
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };


    return (
        <Container sx={{ marginTop: "128px", display: "flex", justifyContent: "center" }}>
            <Box>
                <img src="./images/logo.png" alt="Project Sanctuary Logo" />
                <form >
                    <FormControl>
                        <Box sx={{ marginTop: "16px" }}>
                            <TextField required fullWidth id="email" label="Email" variant="standard" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                        </Box>
                        <Box sx={{ marginTop: "16px" }}>
                            <TextField
                                required
                                fullWidth
                                id="password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                label="Password"
                                variant="standard"
                                InputProps={{
                                    endAdornment:
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                }}
                            />
                        </Box>
                        <Box sx={{ margin: "16px auto" }}>
                            <LoadingButton loading={loading} loadingPosition="center" variant="contained" onClick={loginUser}>Login</LoadingButton>
                        </Box>
                    </FormControl>
                </form>
            </Box>
        </Container>
    )
}

export default Login;