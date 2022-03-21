import { useEffect, useRef, useState } from 'react';
import Login from './pages/login/Login';
import UserCreation from './pages/userCreation/UserCreation';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Dashboard from './pages/dashboard/Dashboard';
import { useDispatch } from 'react-redux';
import { logout, login } from './slices/userSlice';
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
import { database } from './firebase/auth';
import Animal from './interfaces/animal';
import NavDrawerComponent from './components/navDrawerComponent/NavDrawerComponent';
import AppBarComponent from './components/appBarComponent/AppBarComponent';
import { theme } from './components/appBarComponent/AppBarComponent';



const App = () => {
  const dispatch = useDispatch();


  const _isMounted = useRef(true);
  const [locations, setLocations] = useState<Animal[]>([]);


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

  useEffect(() => {

    firebase
      .auth()
      .onAuthStateChanged(authUser => {
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
      });

    return () => { // ComponentWillUnmount 
      _isMounted.current = false;
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <AppBarComponent openVal={false} />

      <Router>
        <NavDrawerComponent openVal={false} />
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
                <MapComponent locations={locations} zoomLevel={1}/>
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