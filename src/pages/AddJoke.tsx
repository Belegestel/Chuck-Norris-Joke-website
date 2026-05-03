import { Box, Paper, Typography, Button, TextField, Stack, Alert } from '@mui/material';
import { useState } from 'react';
import axios from '../services/axios.ts';
import { Sidebar } from '../components/sidebar.tsx';

export const AddJoke = () => {
  const [jokeText, setJokeText] = useState('');
  const [error, setError] = useState('');

  const handleAddJoke = async () => {
    if (!jokeText.trim()) return;
    setError('');

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:3000/jokes/save',
        { 
          value: jokeText,
        },
        { headers: { authorization: `Bearer ${token}` } }
      );
      setJokeText('');
    } catch (err) {
      setError('Failed to add joke.');
    } 
  };

  return (
    <Stack direction="row" spacing={2} sx={{ width: '100%', maxWidth: 1200, height: '65vh' }}>
      <Sidebar />

      <Paper sx={{ 
        flexGrow: 1, 
        width: 0, 
        bgcolor: 'background.paper', 
        p: 6, 
        borderRadius: 5,
        display: 'flex', 
        flexDirection: 'column'
      }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 800, 
            mb: 4, 
            mt: 8, 
            textAlign: 'left',
            fontSize: '2rem' 
          }}
        >
          Add joke
        </Typography>

        <Stack spacing={3} sx={{ width: '100%', maxWidth: 600 }}>
          <TextField
            label="Joke"
            placeholder="Type your joke here"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={jokeText}
            onChange={(e) => setJokeText(e.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
            sx={{
              '& .MuiOutlinedInput-root fieldset': { borderColor: 'secondary.main' },
              '& .MuiInputLabel-root': { bgcolor: 'background.paper', px: 1, color: 'text.primary' }
            }}
          />

          <Button
            fullWidth
            variant="contained"
            disabled={!jokeText.trim()}
            onClick={handleAddJoke}
            sx={{ 
              py: 1.5, 
              fontWeight: 700,
              bgcolor: 'background.default',
              color: 'white',
              '&.Mui-disabled': {
                bgcolor: 'action.disabledBackground',
                color: 'action.disabled'
              }
            }}
          >
            ADD JOKE
          </Button>
          {error && (
            <Alert severity='error' sx={{ mb: 2, mt: 5 }}>
              { error }
            </Alert>
          )}
        </Stack>
      </Paper>
    </Stack>
  );
};
