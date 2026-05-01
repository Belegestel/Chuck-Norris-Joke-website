//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from './assets/vite.svg'
//import heroImg from './assets/hero.png'
//import './App.css'
import { createTheme, ThemeProvider, CssBaseLine, Box } from '@mui/material';
import '@fontsource/josefin-slab';

const theme = createTheme({
  palette: {
    background: {
      default: '#5B64B4',
      paper: '#FDFDFA'
    },
    primary: {
      main: '#E84A8F'
    },
    secondary: {
      main: '#E5B4C6'
    },
    text: {
      primary: '#2C2C2C'
    }
  },
  typography: {
    fontFamily: '"Josefin Slab", serif',
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          backgroundColor: '#FDFDFA'
        }
      }
    }
  }
});

function App() {
  const [count, setCount] = useState(0)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3
      }}>
        <LoginPage />
      </Box>
    </ThemeProvider>
  )
}

export default App
