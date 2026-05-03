import { Box, Paper, TextField, Button, Typography, Link, Stack, Alert } from '@mui/material';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface AuthPageProps {
  login: boolean;
}

export const AuthPage = ({ login }: AuthPageProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const isFormValid = email.length > 0 && password.length > 0;

  useEffect(() => {
    setEmail('');
    setPassword('');
    setError('');
  }, [login]);

  const handleSubmit = async () => {
    setError(null);
    try {
      const resp = await axios.post(`http://localhost:3000${login ? '/auth/login' : '/auth/signup'}`, { email, password });
      
      if (resp.data.access_token) {
        localStorage.setItem('token', resp.data.access_token);
      }

      if (login) {
        navigate('/jokes/random');
      } else {
        navigate('/login');
      }
    } catch (err: any) {
      if (err.response) {
        setError(login ? (err.response.data.message || 'Invalid credentials.') : `Registration failed: ${err.response.data.message}`);
      } else {
        setError('Cannot connect to server.');
      }
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 8, width: '100%', maxWidth: 1200, textAlign: 'center',
        border: '1px solid', borderColor: 'background.paper',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}
    >
      <Box 
        component='img' 
        src='/src/assets/joke-svgrepo-com.svg'
        sx={{ width: 100, mb: 2, display: 'block', mx: 'auto' }}
      />

      <Stack spacing={3} width='100%'>
        <Typography variant='h4' sx={{ mb: 2 }}>{'Explore \Chuck Jokes" with us!'}</Typography>

        <TextField 
          label='E-mail'
          placeholder='Type your email'
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          slotProps={{ inputLabel: { shrink: true } }}
          sx={{
            '& .MuiOutlinedInput-root fieldset': { borderColor: 'secondary.main' },
            '& .MuiInputLabel-root': { bgcolor: 'background.paper', px: 1, color: 'text.primary' }
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
            '& .MuiOutlinedInput-root fieldset': { borderColor: 'secondary.main' },
            '& .MuiInputLabel-root': { bgcolor: 'background.paper', px: 1, color: 'text.primary' }
          }}
        />

        <Button
          variant='contained'
          disabled={!isFormValid}
          onClick={handleSubmit}
          sx={{
            py: 1.5, fontSize: '1rem',
            bgcolor: isFormValid ? 'background.default' : 'action.disabledBackground',
            '&.Mui-disabled': {
              bgcolor: 'action.disabledBackground !important',
              color: 'action.disabled !important' 
            }
          }}
        >
          {login ? 'LOG IN' : 'REGISTER'}
        </Button>

        {error && <Alert severity='error'>{error}</Alert>}

        <Typography variant='body1'>
          {login ? "Don't have an account?" : 'Already have an account?'}{' '}
          <Link 
            component={RouterLink}
            to={login ? '/register' : '/login'}
            sx={{ fontWeight: 700, color: 'text.primary', textDecoration: 'none' }}
          >
            {login ? 'Sign up here.' : 'Log in here.'}
          </Link>
        </Typography>

        <Typography variant='body2' sx={{ color: 'primary.main', mt: 4, fontStyle: 'italic' }}>
          { login ? '"Chuck Norris can login without signing up, on any website"' : '"Chuck Norris can sign up without a website, while offline"' }
        </Typography>
      </Stack>
    </Paper>
  );
};
