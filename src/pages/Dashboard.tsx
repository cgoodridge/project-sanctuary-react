import React, { useState, useEffect, useRef } from 'react';
import Container from '@mui/material/Container';
import { database } from '../firebase/auth';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
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
import Fab from '@mui/material/Fab';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { Input } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import PetsIcon from '@mui/icons-material/Pets';
import MapIcon from '@mui/icons-material/Map';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

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

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
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


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };
  const handleFileUpload = (e: any) => {
    // setSelectedFile(e.target.files[0]);
    console.log("Upload button clicked");
    // if (e.target.files[0] !== null) {
    //   console.log('We have a file');
    // } else {
    //   console.log('We do not have a file');
    // }
  };


  const [animals, setAnimals] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {

    database
      .collection('animals')
      .onSnapshot(snapshot => (
        setAnimals(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        })))
      ))

    return () => { // ComponentWillUnmount 
      _isMounted.current = false;
    }

  }, []);

  useEffect(() => {

    database
      .collection('users')
      .onSnapshot(snapshot => (
        setUsers(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        })))
      ))

    return () => { // ComponentWillUnmount 
      _isMounted.current = false;
    }

  }, []);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };



  return (
    <>
      <Container sx={{ display: 'flex' }}>
        <CssBaseline />
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
            <Typography variant="h6" noWrap component="div">
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List component={Tabs} value={value} onChange={handleChange} orientation="vertical">
            <ListItem button component={Tab} icon={<DashboardIcon />} label={open ? "Dashboard" : ""} iconPosition="start"></ListItem>
            <ListItem button component={Tab} icon={<PetsIcon />} label={open ? "Animals" : ""} iconPosition="start"></ListItem>
            <ListItem button component={Tab} icon={<MapIcon />} label={open ? "Locations" : ""} iconPosition="start"></ListItem>
            <ListItem button component={Tab} icon={<PeopleIcon />} label={open ? "Users" : ""} iconPosition="start"></ListItem>
            <ListItem button component={Tab} icon={<SettingsIcon />} label={open ? "Settings" : ""} iconPosition="start"></ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Drawer>
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <TabPanel value={value} index={0}>
            Dashboard
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 3, sm: 8, md: 12 }}>
              {animals.map((animal, key) => (
                <Grid item xs={2} sm={4} md={4} key={key}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      component="img"
                      height="300"
                      image={animal.data.imgURL}
                      alt={animal.data.commonName}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {animal.data.commonName}
                      </Typography>
                      <Typography variant="body2" noWrap color="text.secondary">
                        {animal.data.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Share</Button>
                      <Button size="small">Learn More</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={2}>
            Locations
          </TabPanel>
          <TabPanel value={value} index={3}>
            Users
          </TabPanel>
          <TabPanel value={value} index={4}>
            Settings
          </TabPanel>

        </Box>
      </Container>

      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Add To the Sanctuary</DialogTitle>
        <DialogContent>

          <DialogContentText>
            Add more animals to the sanctuary.
          </DialogContentText>



          <Avatar sx={{ width: 180, height: 180, margin: "auto", cursor: 'pointer' }} onClick={handleFileUpload}>
            <InsertPhotoIcon sx={{ fontSize: 140 }} />
          </Avatar>



          <TextField
            autoFocus
            margin="dense"
            id="kingdom"
            label="Kingdom"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="phylum"
            label="Phylum"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="kingdomClass"
            label="Class"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="order"
            label="Order"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="family"
            label="Family"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="genus"
            label="Genus"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="species"
            label="Species"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="commonName"
            label="Common Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            multiline
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog>

      <Container>
        <Box sx={{ '& > :not(style)': { m: 1 }, position: "fixed", right: "10%" }}>
          <Fab color="primary" variant="extended" onClick={handleClickOpen}>
            <AddIcon sx={{ mr: 1 }} />
            Add Animal
          </Fab>
        </Box>
      </Container>

    </>
  )
}

export default Dashboard;