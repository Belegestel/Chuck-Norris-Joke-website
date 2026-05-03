import { Box, Paper, Typography, Stack, IconButton } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from '../services/axios.ts';
import { Sidebar } from '../components/sidebar.tsx';

interface SavedJoke {
  id: number;
  value: string;
}

export const MyJokes = () => {
  const [jokes, setJokes] = useState<SavedJoke[]>([]);

  useEffect(() => {
    fetchJokes();
  }, []);

  const fetchJokes = async () => {
    try {
      const token = localStorage.getItem('token');
      const resp = await axios.get('http://localhost:3000/jokes/my-jokes', {
        headers: { authorization: `Bearer ${token}` }
      });
      setJokes(resp.data);
    } catch (err) {
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/jokes/${id}`, {
        headers: { authorization: `Bearer ${token}` }
      });
      setJokes(jokes.filter(j => j.id !== id));
    } catch (err) {
      alert('Failed to delete joke', err);
    }
  };

  return (
    <Stack direction="row" spacing={2} sx={{ width: '100%', maxWidth: 1200, height: '65vh' }}>
      <Sidebar />

<Paper sx={{ 
  width: '75%', bgcolor: 'background.paper', p: 4, borderRadius: 5,
  display: 'flex', flexDirection: 'column'
}}>
  <Typography 
    variant="h4" 
    sx={{ 
      fontWeight: 800, 
      mb: 3, 
      mt: 8,
      textAlign: 'left',
      fontSize: '2rem'
    }}
  >
    My jokes list
  </Typography>

  <Box sx={{ 
    flexGrow: 1, 
    overflowY: 'auto', 
    pr: 1,
    '&::-webkit-scrollbar': { width: '6px' },
    '&::-webkit-scrollbar-thumb': { bgcolor: '#ccc', borderRadius: '4px' }
  }}>
    <Stack spacing={0.5}>
      {jokes.map((joke, index) => (
        <Stack 
          key={joke.id}
          direction="row" 
          sx={{ 
            p: '4px 12px',
            borderRadius: 2,
            transition: 'background-color 0.2s',
            '&:hover': { 
              bgcolor: 'rgba(255, 0, 0, 0.08)',
            }
          }}
        >
          <Typography 
            sx={{ 
              textAlign: 'left', 
              fontSize: '0.9rem',
              fontWeight: 500,
              flexGrow: 1,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              mr: 2
            }}
          >
            {index + 1}. {joke.value}
          </Typography>

          <IconButton 
            onClick={() => handleDelete(joke.id)}
            size="small"
            sx={{ 
              '&:hover': { bgcolor: 'rgba(255, 0, 0, 0.15)' } 
            }}
          >
            <Box 
              component="img" 
              src="/src/assets/backspace.png" 
              sx={{ width: 18, height: 18, opacity: 0.7 }} 
            />
          </IconButton>
        </Stack>
      ))}
    </Stack>
  </Box>
</Paper>
    </Stack>
  );
};
