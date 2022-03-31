import { useEffect, useState, useRef } from 'react';
import { userCollectionRef, authRef, database } from '../../firebase/auth';
import { Badge, Card, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, Input, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import "./userListComponent.css";
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { Grid, CardActions, CardMedia, CardContent, Typography, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { alpha } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { getDocs } from 'firebase/firestore';
import AnimalDataForm from '../addAnimalsForm/AnimalDataForm';
import ConfirmationForm from '../addAnimalsForm/ConfirmationForm';
import MapFormComponent from '../mapFormComponent/MapFormComponent';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import firebase from '../../firebase/firebaseConfig';
import EditIcon from '@mui/icons-material/Edit';

interface Data {
    firstName: string;
    lastName: string;
    role: string;
    email: string;
    dateAdded: Date;

}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
        a: { [key in Key]: number | string },
        b: { [key in Key]: number | string },
    ) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
    id: keyof Data;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'firstName',
        numeric: false,
        label: 'First Name',
    },
    {
        id: 'lastName',
        numeric: false,
        label: 'Last Name',
    },
    {
        id: 'email',
        numeric: false,
        label: 'E-mail',
    },
    {
        id: 'role',
        numeric: false,
        label: 'Role',
    },
    {
        id: 'dateAdded',
        numeric: true,
        label: 'Date Added',
    },

];

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler =
        (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all users',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding='normal'
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

interface EnhancedTableToolbarProps {
    numSelected: number;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
    const { numSelected } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme: { palette: { primary: { main: string; }; action: { activatedOpacity: number; }; }; }) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Users
                </Typography>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};


const UserListComponent = () => {

    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof Data>('firstName');
    const [selected, setSelected] = useState<readonly string[]>([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const _isMounted = useRef(true);
    const [rows, setUsers] = useState<any[]>([]);

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDense(event.target.checked);
    };

    const isSelected = (name: string) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

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

    useEffect(() => {

        const getUserList = async () => {
            const data = await getDocs(userCollectionRef);
            if (_isMounted.current) {

            }
        }

        getUserList();

        return () => { // ComponentWillUnmount 
            _isMounted.current = false;
        }

    }, []);

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

            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <EnhancedTableToolbar numSelected={selected.length} />
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
                        >
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={rows.length}
                            />
                            <TableBody>
                                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
                                {stableSort(rows, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        // const isItemSelected = isSelected(row.firstName);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                // onClick={(event) => handleClick(event, row.firstName)}
                                                // role="checkbox"
                                                // aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.firstName}
                                            // selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        color="primary"
                                                        // checked={isItemSelected}
                                                        inputProps={{
                                                            'aria-labelledby': labelId,
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell align='left' component="th" id={labelId} scope="row" padding="normal">{row.firstName}</TableCell>
                                                <TableCell align="left">{row.lastName}</TableCell>
                                                <TableCell align="left">{row.email}</TableCell>
                                                <TableCell align="left">{row.role}</TableCell>
                                                <TableCell align="right">{row.dateAdded}</TableCell>
                                                <TableCell align="right">
                                                    <IconButton aria-label="edit">
                                                        <EditIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: (dense ? 33 : 53) * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={4} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>

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