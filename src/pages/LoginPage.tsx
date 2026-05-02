import { Box, Paper, TextField, Button, Typography, Link, Stack } from '@mui/material';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isFormValid = email.length > 0 && password.length > 0;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 8,
        width: '100%',
        maxWidth: 1200,
        textAlign: 'center',
        border: '1px solid',
        borderColor: 'background.paper',
        boxShadow: '-15px 15px 0px rgba(0, 0, 0, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative'
      }}>

      <Box 
        component='img' 
        src='/src/assets/joke-svgrepo-com.svg'
        sx={{
          width: 100,
          mb: 2,
          display: 'block',
          mx: 'auto'
        }}
      />

      <Stack spacing={3} width='100%'>
        <Typography variant='h4' sx={{ mb: 2 }}>
          Explore "Chuck Jokes" with us!
        </Typography>

        <TextField 
          label='E-mail'
          placeholder='Type your email'
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          slotProps={{ inputLabel: { shrink: true } }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'secondary.main' }
            },
            '& .MuiInputLabel-root': {
              backgroundColor: 'background.paper',
              px: 1,
              color: 'text.primary'
            }
          }}
        />

        <TextField 
          label='Password'
          placeholder='Type your password'
          type='password'
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          slotProps={{ inputLabel: { shrink: true } }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'secondary.main'}
            },
            '& .MuiInputLabel-root': {
              backgroundColor: 'background.paper',
              px: 1,
              color: 'text.primary'
            }
          }}
        />

        <Button
          variant='contained'
          disabled={ !isFormValid }
          sx={{
            py: 1.5,
            fontSize: '1rem',
            bgcolor: isFormValid ? 'background.default' : 'disabled.main',
            '&.Mui-disabled': {
              bgcolor: 'action.disabledBackground !important',
              color: 'action.disabled !important' 
            }
          }}
        >
          LOG IN
        </Button>

        <Typography variant='body1'>
          Don't have an account?{' '}
          <Link 
            component={RouterLink}
            to="/register"
            sx={{ fontWeight: 700, color: 'text.primary', textDecoration: 'none' }}
          >
            Sign up here.
          </Link>
        </Typography>

        <Typography 
          variant="body2" 
          sx={{ color: 'primary.main', mt: 4, fontStyle: 'italic' }}
        >
          "Chuck Norris can login without signing up, on any website"
        </Typography>

      </Stack>
    </Paper>
  );
}
