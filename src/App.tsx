import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline, Box } from '@mui/material';
import '@fontsource/josefin-slab/400.css';
import '@fontsource/josefin-slab/400-italic.css';
import '@fontsource/josefin-slab/700.css';
import '@fontsource/josefin-slab/700-italic.css';
import '@fontsource/josefin-slab';
import { useState } from 'react';

import { LoginPage } from './pages/LoginPage.tsx';
import { RegisterPage } from './pages/RegisterPage.tsx';
import { RandomJoke } from './pages/RandomJoke.tsx';
import { MyJokes } from './pages/MyJokes.tsx';
import { AddJoke } from './pages/AddJoke.tsx';

const theme = createTheme({
  palette: {
    background: {
      default: '#5B64B4',
      paper: '#FDFDFA',
      gray: '#737172'
    },
    primary: {
      main: '#E84A8F'
    },
    secondary: {
      main: '#E5B4C6'
    },
    text: {
      primary: '#2C2C2C',
      secondary: '#FDFDFA'
    },
    action: {
      disabledBackground: '#AAAAAA',
      disabled: '#FDFDFD'
    }
  },
  typography: {
    fontFamily: '"Josefin Slab", serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '#root': {
          border: 'none !important',
          outline: 'none !important',
          boxShadow: 'none !important',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          backgroundColor: '#FDFDFA',
          border: 'none',
          boxShadow: '-20px 20px 10px rgba(0, 0, 0, 0.15)'
        }
      }
    }
  }
});

declare module '@mui/material/styles' {
  interface Palette {
    disabled: Palette['primary'];
  }
  interface PaletteOptions {
    disabled?: PaletteOptions['primary'];
  }
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{
          minHeight: '100vh',
          bgcolor: 'background.default',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 3,
        }}>
          <Routes>
            <Route path='/' element={ <Navigate to="/login" /> } />
            <Route path='/login' element={ <LoginPage /> } />
            <Route path='/register' element={ <RegisterPage /> } />
            <Route path='/jokes' element={ <Navigate to='/jokes/random' /> } />
            <Route path='/jokes/random' element={ <RandomJoke /> } />
            <Route path='/jokes/my' element={ <MyJokes /> } />
            <Route path='/jokes/add' element={ <AddJoke /> } />
          </Routes>
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
