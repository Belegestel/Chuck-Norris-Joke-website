import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline, Box } from '@mui/material';
import '@fontsource/josefin-slab/400.css';
import '@fontsource/josefin-slab/400-italic.css';
import '@fontsource/josefin-slab/700.css';
import '@fontsource/josefin-slab/700-italic.css';
import '@fontsource/josefin-slab';
import { useState } from 'react';
import { LoginPage } from './pages/LoginPage.tsx';

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

declare module '@mui/materials/styles' {
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
          p: 3
        }}>
          <LoginPage />
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
