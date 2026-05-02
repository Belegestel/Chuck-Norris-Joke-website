import { Box, Paper, TextField, Button, Typography, Link, Stack, Alert } from '@mui/material';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  

  const isFormValid = email.length > 0 && password.length > 0;

  const handleLogin = async () => {
    setError(null);
    try {
      const resp = await axios.post('http://localhost:3000/auth/signup', { email, password })
      if(resp.data.access_token) {
        localStorage.setItem('token', resp.data.access_token);
      }
      navigate('/login');
    } catch (err: any) {
      if(err.response) {
        setError('Registration failed, ' || err.response.data.message);
      }
      else {
        setError('Cannot connect to server.');
        console.error(err);
      }
    }
  }

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
          type='submit'
          onClick={handleLogin}
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
          REGISTER
        </Button>

        {error && (
          <Alert severity='error' sx={{ mb: 2 }}>
            { error }
          </Alert>
        )}

        <Typography variant='body1'>
          Already have an account?{' '}
          <Link 
            component={RouterLink}
            to="/login"
            sx={{ fontWeight: 700, color: 'text.primary', textDecoration: 'none' }}
          >
            Log in here.
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
