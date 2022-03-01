import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useForm, SubmitHandler } from 'react-hook-form';


interface State {
    email: string;
    password: string;
    showPassword: boolean;
}

const UserCreation = () => {

    const [values, setValues] = useState<State>({
        email: '',
        password: '',
        showPassword: false,
    });

    const { register, handleSubmit, reset } = useForm<State>();

    const onSubmit: SubmitHandler<State> = data => {
        console.log(data);
    };


    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleChange =
        (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setValues({ ...values, [prop]: event.target.value });
        };

    return (
        <Container sx={{ padding: "32px", marginTop: "128px" }}>
            <img src="/images/logo.png" alt="Project Sanctuary Logo" />
            <Box>

                <FormControl onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ marginTop: "16px" }}>
                        <TextField fullWidth id="email" label="Email" variant="standard" value={values.email} onChange={handleChange('email')} type="email" />
                    </Box>
                    <Box sx={{ marginTop: "16px" }}>
                        <TextField
                            fullWidth
                            id="password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
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
                </FormControl>

            </Box>

            <Box sx={{ margin: "16px" }}>
                <Button variant="contained">Login</Button>
            </Box>

        </Container>
    )
}

export default UserCreation;