import React from 'react';
import Login from './pages/Login';
import UserCreation from './pages/UserCreation';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import Dashboard from './pages/Dashboard';

const App = () => {

  const theme = createTheme({
    palette: {
      primary: {
        main: orange[500],
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <nav>

          </nav>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<UserCreation />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>

  );
}

export default App;
