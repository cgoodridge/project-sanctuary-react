import { useEffect, useRef } from 'react';
import Login from './pages/login/Login';
import UserCreation from './pages/userCreation/UserCreation';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import Dashboard from './pages/dashboard/Dashboard';
import { useDispatch } from 'react-redux';
import { logout, login } from './slices/userSlice';
import firebase from 'firebase/compat/app';
import ProtectedRoute from './router/ProtectedRoute';
import RedirectRoute from './router/RedirectRoute';
import AnimalDetail from './pages/animalDetail/AnimalDetail';
import NotFoundPage from './pages/notFoundPage/NotFound';

const App = () => {

  const dispatch = useDispatch();
  const _isMounted = useRef(true);

  const theme = createTheme({
    palette: {
      primary: {
        main: orange[500],
      },
    },
  });

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
      <Router>
        <div className="App">
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
            <Route path="/animals/:name" element={
              <ProtectedRoute>
                <AnimalDetail />
              </ProtectedRoute>
            } />
            <Route path="*" element={ <NotFoundPage /> } />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>

  );
}

export default App;