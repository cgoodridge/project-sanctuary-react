import { useEffect, useRef, useState } from 'react';
import Login from './pages/login/Login';
import UserCreation from './pages/userCreation/UserCreation';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Dashboard from './pages/dashboard/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { logout, login, selectUser } from './slices/userSlice';
import firebase from 'firebase/compat/app';
import ProtectedRoute from './router/ProtectedRoute';
import RedirectRoute from './router/RedirectRoute';
import AnimalDetail from './pages/animalDetail/AnimalDetail';
import NotFoundPage from './pages/notFoundPage/NotFound';
import CssBaseline from '@mui/material/CssBaseline';
import UserListComponent from './components/userListComponent/UserListComponent';
import AnimalListComponent from './components/animalListComponent/AnimalListComponent';
import MapComponent from './components/mapComponent/MapComponent';
import Settings from './pages/settings/Settings';
import { database, firebaseLogout } from './firebase/auth';
import Animal from './interfaces/animal';
import AppBarComponent from './components/appBarComponent/AppBarComponent';
import Toolbar from '@mui/material/Toolbar';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import List from '@mui/material/List';
import PeopleIcon from '@mui/icons-material/People';
import PetsIcon from '@mui/icons-material/Pets';
import MapIcon from '@mui/icons-material/Map';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import MuiDrawer from '@mui/material/Drawer';
import LocationListComponent from './components/locationListComponent/LocationListComponent';
import { animalCollectionRef } from './firebase/auth';
import { getDocs } from 'firebase/firestore';


const drawerWidth = 240;
const theme = createTheme({
  palette: {
    primary: {
      main: orange[500],
    },
  },
});

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);



const App = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const user = useSelector(selectUser);

  const handleDrawerOpen = () => {
    setOpen(true);
  };


  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logoutAndClear = () => {
    firebaseLogout()
      .then(() => {
        dispatch(logout());
      });

    // logout();
  };

  const _isMounted = useRef(true);
  const [locations, setLocations] = useState<Animal[]>([]);


  useEffect(() => {

    firebase
      .auth()
      .onAuthStateChanged(authUser => {
        if (_isMounted.current) {
          if (authUser) {
            // The user just logged in/was logged in
            dispatch(
              login({
                email: authUser.email,
                uid: authUser.uid,
                displayName: authUser.displayName,
              }))
          } else {
            // The user is logged out
            dispatch(logout());
          }
        }
      });

    return () => { // ComponentWillUnmount 
      _isMounted.current = false;
    }
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      {user ?
        <AppBar open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="p">
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        :
        <div></div>
      }


      <Router>
        {user ?
          <Drawer variant="permanent" open={open}>
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
              <ListItem button component={Link} to="/">
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>

              <ListItem button component={Link} to="/animals">
                <ListItemIcon>
                  <PetsIcon />
                </ListItemIcon>
                <ListItemText primary="Animals" />
              </ListItem>
              <ListItem button component={Link} to="/locations">
                <ListItemIcon>
                  <MapIcon />
                </ListItemIcon>
                <ListItemText primary="Locations" />
              </ListItem>
              <ListItem button component={Link} to="/users">
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItem>
              <ListItem button component={Link} to="/settings">
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem button onClick={logoutAndClear}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
          </Drawer>
          :
          <div></div>
        }

        <Box component="main" sx={{ flexGrow: 1, p: 16 }}>
          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/login" element={
              <RedirectRoute>
                <Login />
              </RedirectRoute>
            }
            />
            <Route path="/register" element={
              <RedirectRoute>
                <UserCreation />
              </RedirectRoute>
            }
            />
            <Route path="/animals" element={
              <ProtectedRoute>
                <AnimalListComponent />
              </ProtectedRoute>
            } />
            <Route path="/animals/:name" element={
              <ProtectedRoute>
                <AnimalDetail />
              </ProtectedRoute>
            } />
            <Route path="/locations" element={
              <ProtectedRoute>
                <MapComponent />
                <LocationListComponent />
              </ProtectedRoute>
            } />
            <Route path="/users" element={
              <ProtectedRoute>
                <UserListComponent />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;