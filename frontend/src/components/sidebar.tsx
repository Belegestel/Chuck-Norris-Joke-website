import { Box, Paper, Typography, Button, Stack } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  const sidebarButtonStyle = (path: string) => ({
    color: 'text.secondary',
    fontSize: '1.5rem',
    justifyContent: 'flex-start',
    px: 0,
    textTransform: 'none',
    fontWeight: isActive(path) ? 700 : 400,
    textDecoration: isActive(path) ? 'underline' : 'none',
    textUnderlineOffset: '4px',
    '&:hover': {
        backgroundColor: 'transparent'
    },
  });

  return (
    <Paper sx={{ 
      flexBasis: '25%', flexShrink: 0, flexGrow: 0, bgcolor: 'background.gray',
      p: 4, borderRadius: 5, display: 'flex', flexDirection: 'column',
      justifyContent: 'space-between',
    }}>
      <Box sx={{ width: '100%' }}>
        <Box 
          component='img' 
          src='/src/assets/joke-svgrepo-com.svg' 
          sx={{ width: 60, mb: 4, filter: 'brightness(0) invert(1)' }} 
        />
        
        <Stack spacing={1} sx={{ width: '100%' }}>
          <Button 
            fullWidth 
            onClick={() => navigate('/jokes/random')}
            sx={sidebarButtonStyle('/jokes/random')}
          >
            RANDOM JOKE
          </Button>
          
          <Button 
            fullWidth 
            onClick={() => navigate('/jokes/my')}
            sx={sidebarButtonStyle('/jokes/my')}
          >
            MY JOKES
          </Button>
          
          <Button 
            fullWidth 
            onClick={() => navigate('/jokes/add')}
            sx={sidebarButtonStyle('/jokes/add')}
          >
            ADD JOKE
          </Button>
        </Stack>
      </Box>

      <Box sx={{ width: '100%' }}>
        <Box sx={{ mb: 2 }}>
          <Button 
            onClick={handleLogout} 
            fullWidth
            sx={{ 
              color: 'text.secondary', 
              fontSize: '1.5rem',
              justifyContent: 'flex-start',
              px: 0,
            }}
          >
            LOG OUT
          </Button>
        </Box>
        <Typography variant="caption" display="block" sx={{ color: 'text.secondary' }}>
          made with Chuck by Chuck - 2026
        </Typography>
      </Box>
    </Paper>
  );
};
