import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import UserCreation from './pages/UserCreation';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import Dashboard from './pages/Dashboard';
import { useDispatch } from 'react-redux';
import { logout, login } from './slices/userSlice';
import firebase from 'firebase/compat/app';
import ProtectedRoute from './router/ProtectedRoute';

const App = () => {

  const [isAuth, setIsAuth] = useState(false);
  const dispatch = useDispatch();

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

    // return () => { // ComponentWillUnmount 
    //   _isMounted.current = false;
    // }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <nav>

          </nav>
          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/login" element={
              <ProtectedRoute>
                <Login />
              </ProtectedRoute>
            }
            />
            <Route path="/register" element={
              <ProtectedRoute>
                <UserCreation />
              </ProtectedRoute>
            }
            />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>

  );
}

export default App;
