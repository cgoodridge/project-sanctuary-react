import { useRef, useState } from 'react';
import Login from './pages/login/Login';
import UserCreation from './pages/userCreation/UserCreation';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider, makeStyles } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Dashboard from './pages/dashboard/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { logout, login, selectUser } from './slices/userSlice';
import firebase from 'firebase/compat/app';
import ProtectedRoute from './router/ProtectedRoute';
import RedirectRoute from './router/RedirectRoute';
import AnimalDetail from './pages/animalDetail/AnimalDetail';
import NotFoundPage from './pages/notFoundPage/NotFound';
import UserListComponent from './components/userListComponent/UserListComponent';
import AnimalListComponent from './components/animalListComponent/AnimalListComponent';
import MapComponent from './components/mapComponent/MapComponent';
import Settings from './pages/settings/Settings';
import { database, firebaseLogout } from './firebase/auth';
import Animal from './interfaces/animal';
import AppBarComponent from './components/appBarComponent/AppBarComponent';
import Toolbar from '@mui/material/Toolbar';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { orange } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import LocationListComponent from './components/locationListComponent/LocationListComponent';
import { animalCollectionRef } from './firebase/auth';
import { getDocs } from 'firebase/firestore';
import { persistor } from '.';
import DarkMode from './components/darkMode/DarkMode';
import './components/darkMode/DarkMode.css';
import { Avatar, Button, Container, Menu, MenuItem, Tooltip } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import { UserProvider } from './firebase/UserProvider';
import Profile from './pages/profile/Profile';
import { useSession } from './firebase/UserProvider';
import PetsIcon from '@mui/icons-material/Pets';




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

const App = () => {

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const user = useSession();
  // console.log(user);

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logoutAndClear = () => {
    persistor.purge();
    firebaseLogout()
      .then(() => {

        dispatch(logout());
      });

    // logout();
  };

  const pages = [{ buttonName: 'Dashboard', buttonURL: '/' }, { buttonName: 'Animals', buttonURL: '/animals' }, { buttonName: 'Locations', buttonURL: '/locations' }, { buttonName: 'Users', buttonURL: '/users' }];
  const settings = [{ buttonName: 'Profile', buttonEvent: '/profile' }, { buttonName: 'Account', buttonEvent: '/account' }];

  const _isMounted = useRef(true);
  const [locations, setLocations] = useState<Animal[]>([]);


  return (
    // <UserProvider>
    <ThemeProvider theme={theme}>
      <Router>
        {user.user ?
          <AppBar position="static" enableColorOnDark>
            <Container maxWidth="xl">
              <Toolbar disableGutters>
                {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >
                  PROJECT SANCTUARY
                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: 'block', md: 'none' },
                    }}
                  >
                    {pages.map((page) => (
                      <MenuItem key={page.buttonURL} onClick={handleCloseNavMenu} component={Link} to={page.buttonURL}>
                        <Typography textAlign="center">{page.buttonName}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
                {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
                <Typography
                  variant="h5"
                  noWrap
                  component="a"
                  href=""
                  sx={{
                    mr: 2,
                    display: { xs: 'flex', md: 'none' },
                    flexGrow: 1,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >
                  LOGO
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  {pages.map((page) => (
                    <Button
                      key={page.buttonURL}
                      component={Link} to={page.buttonURL}
                      sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                      {page.buttonName}
                    </Button>
                  ))}
                </Box>

                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="">P</Avatar>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}

                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >

                    {settings.map((setting) => (
                      <MenuItem key={setting.buttonName} component={Link} to={setting.buttonEvent}>
                        <Typography textAlign="center">{setting.buttonName}</Typography>
                      </MenuItem>
                    ))}
                    <MenuItem onClick={() => logoutAndClear()}>
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>

                    {/* <MenuItem onClick={handleCloseUserMenu}> */}
                    <MenuItem >
                      <Typography textAlign="center">Theme</Typography>
                      <DarkMode />
                    </MenuItem>
                  </Menu>
                </Box>
              </Toolbar>
            </Container>
          </AppBar>
          :
          <></>
        }


        <Box component="main" sx={{ flexGrow: 1 }}>
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
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
    // </UserProvider>

  );
}

export default App;