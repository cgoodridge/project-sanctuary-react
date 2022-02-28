import React from 'react';
import Login from './pages/Login';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { orange } from '@mui/material/colors';

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
            <Route path="/" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>

  );
}

export default App;
