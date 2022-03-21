import React, { useState, useEffect, useRef } from 'react';
import Container from '@mui/material/Container';
import { database, firebaseLogout } from '../../firebase/auth';
import Box from '@mui/material/Box';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import PeopleIcon from '@mui/icons-material/People';
import PetsIcon from '@mui/icons-material/Pets';
import MapIcon from '@mui/icons-material/Map';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import UserListComponent from '../../components/userListComponent/UserListComponent';
import './dashboard.css';
import AnimalListComponent from '../../components/animalListComponent/AnimalListComponent';
import MapComponent from '../../components/mapComponent/MapComponent';
import AnimalCountComponent from '../../components/dashboardDataComponents/animalCountComponent/AnimalCountComponent';
import DashboardContainerComponent from '../../components/dashboardDataComponents/dashboardContainerComponent/DashboardContainerComponent';
import Animal from '../../interfaces/animal';
import { useDispatch } from 'react-redux';
import { logout } from '../../slices/userSlice';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import LocationListComponent from '../../components/locationListComponent/LocationListComponent';


const drawerWidth = 240;

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

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      className="tabPanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 4 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Dashboard = ({ }) => {

  const _isMounted = useRef(true);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const dispatch = useDispatch();
  const [locations, setLocations] = useState<Animal[]>([]);

  const [bottomNavValue, setBottomNavValue] = React.useState(0);

  useEffect(() => {

    database
      .collection('animals')
      .onSnapshot(snapshot => (
        setLocations(snapshot.docs.map(doc => ({
          class: doc.data().kingdomClass,
          commonName: doc.data().commonName,
          dateAdded: doc.data().dateAdded,
          description: doc.data().description,
          diet: doc.data().diet,
          family: doc.data().family,
          genus: doc.data().genus,
          imgURL: doc.data().imgURL,
          kingdom: doc.data().kingdom,
          latitude: doc.data().latitude,
          longitude: doc.data().longitude,
          lifespan: doc.data().lifespan,
          lifestyle: doc.data().lifestyle,
          location: doc.data().location,
          nameOfYoung: doc.data().nameOfYoung,
          order: doc.data().order,
          phylum: doc.data().phylum,
          redlistStatus: doc.data().redListStatus,
          scientificName: doc.data().scientificName,
          source: doc.data().source,
        })))
      ))
    return () => { // ComponentWillUnmount 
      _isMounted.current = false;
    }

  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const logoutAndClear = () => {
    dispatch(logout());

    // logout();
  };

  return (
    <>
      <DashboardContainerComponent />
    </>
  )
}

export default Dashboard;