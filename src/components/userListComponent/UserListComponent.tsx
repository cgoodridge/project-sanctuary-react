import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { userCollectionRef, authRef, database } from '../../firebase/auth';
import { Badge, Card, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, Input, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import "./userListComponent.css";
import { Grid, CardActions, CardMedia, CardContent, Typography, Button } from '@mui/material';
import Box from '@mui/material/Box';
import { getDocs } from 'firebase/firestore';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import firebase from '../../firebase/firebaseConfig';
import EditIcon from '@mui/icons-material/Edit';
import { selectUser } from '../../slices/userSlice';
import { useSelector } from 'react-redux';
import PersonIcon from '@mui/icons-material/Person';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../darkMode/DarkMode.css';
import { AnalyticsTwoTone } from '@mui/icons-material';

interface User {
    id: string;
    firstName: string;
    lastName: string;
    role: string;
    email: string;
    dateAdded: string;

}

const UserListComponent = () => {

    const currentUser = useSelector(selectUser);

    const [users, setUsers] = useState<User[]>([]);

    const _isMounted = useRef(true);

    useEffect(() => {

        const getUserList = async () => {
            const data = await getDocs(userCollectionRef);
            if (_isMounted.current) {
                setUsers(data.docs.map(doc => ({
                    id: doc.id,
                    firstName: doc.data().firstName,
                    lastName: doc.data().lastName,
                    email: doc.data().email,
                    role: doc.data().role,
                    dateAdded: doc.data().dateAdded.toDate().toDateString(),
                })))
            }
        }

        getUserList();

        return () => { // ComponentWillUnmount 
            _isMounted.current = false;
        }

    }, []);

    // console.log(users[0].firstName);

    const [openDialog, setOpenDialog] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordErrorState, setPasswordErrorState] = useState(false);
    const [role, setRole] = useState('');
    const [openConfirmMessage, setOpenConfirmMessage] = useState(false);
    const navigate = useNavigate();


    const handleSave = () => {
        if (password !== passwordConfirm) {
            setPasswordError("Passwords do not match");
            setPasswordErrorState(true);
            return;
        } else {
            authRef.createUserWithEmailAndPassword(email, password)
                .then((user) => {
                    database
                        .collection('users')
                        .doc(user.user?.uid)
                        .set({
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            dateAdded: firebase.firestore.Timestamp.fromDate(new Date()),
                            role: role
                        })
                })
                .then(() => {
                    setFirstName('');
                    setLastName('');
                    setEmail('');
                    setPassword('');
                    setRole('');
                    setOpenDialog(false);
                    setOpenConfirmMessage(true);
                    navigate('/users');
                })
                .catch(error => alert(error.message))
        }

    }

    const handleEdit = () => {
        // Replace cells with text fields
    }

    const handleConfirmMessageOpen = () => {
        setOpenConfirmMessage(true);
    };

    const handleConfirmMessageClose = () => {
        setOpenConfirmMessage(false);
    };


    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    return (
        <>
            <Dialog
                open={openConfirmMessage}
                onClose={handleConfirmMessageClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'center' }}>
                    New User Added!
                </DialogTitle>
                <DialogContent className="resConfirmed">
                    <lottie-player src="https://assets7.lottiefiles.com/packages/lf20_tia15mzy.json" background="transparent" speed="1" style={{ width: '250px', height: '250px' }} loop autoplay></lottie-player>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmMessageClose} autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>

            {users.map((user: any, key: any) => {

                return <Accordion key={key} className="tileColour userTile">

                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        className="iconColour"
                    >
                        <Typography>{user.firstName} {user.lastName}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                                <Grid item xs={1} sm={4} md={4}>
                                    <Typography >Email:</Typography>
                                </Grid>
                                <Grid item xs={2} sm={4} md={4}>
                                    <Typography className="emailField">{user.email}</Typography>
                                </Grid>

                            </Grid>
                            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                                <Grid item xs={1} sm={4} md={4}>
                                    <Typography>Role:</Typography>
                                </Grid>
                                <Grid item xs={2} sm={4} md={4}>
                                    <Typography>{user.role}</Typography>
                                </Grid>

                            </Grid>
                            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                                <Grid item xs={1} sm={4} md={4}>
                                    <Typography>Date Added:</Typography>
                                </Grid>
                                <Grid item xs={2} sm={4} md={4}>
                                    <Typography>{user.dateAdded}</Typography>
                                </Grid>

                            </Grid>
                        </Box>
                    </AccordionDetails>
                </Accordion>

            })}

            <Dialog open={openDialog} onClose={handleClose} >
                <DialogTitle>Save New User</DialogTitle>
                <DialogContent>

                    <form action="">
                        <Box sx={{ width: '25vw' }}>
                            <TextField
                                required
                                fullWidth
                                autoFocus
                                margin="dense"
                                id="firstName"
                                label="First Name"
                                value={firstName}
                                onChange={(e: any) => setFirstName(e.target.value)}
                                type="text"
                                variant="standard"
                            />
                            <TextField
                                required
                                autoFocus
                                fullWidth
                                margin="dense"
                                id="lastName"
                                label="Last Name"
                                value={lastName}
                                onChange={(e: any) => setLastName(e.target.value)}
                                type="text"
                                variant="standard"
                            />
                            <TextField
                                required
                                autoFocus
                                fullWidth
                                margin="dense"
                                id="email"
                                label="E-mail"
                                value={email}
                                onChange={(e: any) => setEmail(e.target.value)}
                                type="email"
                                variant="standard"
                            />
                            <TextField
                                required
                                autoFocus
                                fullWidth
                                margin="dense"
                                id="password"
                                label="Password"
                                value={password}
                                onChange={(e: any) => setPassword(e.target.value)}
                                type="password"
                                variant="standard"
                            />
                            <TextField
                                required
                                autoFocus
                                fullWidth
                                margin="dense"
                                id="passwordConfirm"
                                label="Confirm Password"
                                value={passwordConfirm}
                                onChange={(e: any) => setPasswordConfirm(e.target.value)}
                                type="password"
                                variant="standard"
                            />
                            {passwordErrorState ? <span className='passwordError'>{passwordError}</span> : <></>}
                            <InputLabel id="demo-simple-select-standard-label">Role</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={role}
                                fullWidth
                                onChange={(e: any) => setRole(e.target.value)}
                                label="Role"

                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={"admin"}>Admin</MenuItem>
                                <MenuItem value={"user"}>User</MenuItem>

                            </Select>
                        </Box>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
            <Container>
                <Box sx={{ '& > :not(style)': { m: 1 }, position: "fixed", right: "10%" }}>
                    <Fab color="primary" variant="extended" onClick={handleClickOpen}>
                        <AddIcon sx={{ mr: 1 }} />
                        Add User
                    </Fab>
                </Box>
            </Container>
        </>
    );
}

export default UserListComponent;