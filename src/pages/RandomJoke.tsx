import { Box, Paper, Typography, Button, TextField, Stack, MenuItem, Select, FormControl, InputLabel, Alert } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../services/axios.ts';
import { Sidebar } from '../components/sidebar.tsx';

export const RandomJoke = () => {
  const [joke, setJoke] = useState(''); 
  const [categories, setCategories] = useState<string[]>([]); 
  const [selectedCategory, setSelectedCategory] = useState('');
  const [impersonateName, setImpersonateName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setError('');
      try {
        const token = localStorage.getItem('token');
        const resp = await axios.get(
          'http://localhost:3000/jokes/categories',
          { headers: { authorization: `Bearer ${token}` } }
        );
        setCategories(resp.data);
      } catch(err) {
        setError('Failed to fetch categories');
      }
    })();
    handleGetJoke();
  }, []);

  const handleGetJoke = async () => {
    setError('');
    try { 
      const token = localStorage.getItem('token');
      const url = 'http://localhost:3000/jokes/random';
      const params = new URLSearchParams();
      if(selectedCategory) params.append('category', selectedCategory);
      if(impersonateName) params.append('name', impersonateName);
      
      const resp = await axios.get(`${url}?${params.toString()}`, {
        headers: { authorization: `Bearer ${token}` }
      });
      setJoke(resp.data.value);
    } catch(err) {
      setJoke('This error is the only thing Chuck Norris fears.')
      setError(`Failed to fetch a joke: ${err}`)
    }
  };

  const handleSaveJoke = async () => {
    setError('');
    try {
      const token = localStorage.getItem('token');
      if (!joke) return;

      await axios.post(
        'http://localhost:3000/jokes/save', 
        { value: joke },
        { headers: { authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      setError(`Failed to save the joke: ${err}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Stack direction="row" spacing={2} sx={{ width: '100%', maxWidth: 1200, height: '65vh' }}>
      <Sidebar />

      <Paper sx={{ 
        width: '75%', bgcolor: 'background.paper', p: 6, borderRadius: 5,
        position: 'relative', display: 'flex', flexDirection: 'column', 
      }}>
        <Box 
          component="img" 
          src="/src/assets/norris.png"
          sx={{ 
            height: 120, borderRadius: 4,
            border: '4px solid white', boxShadow: 3,
            position: 'absolute', top: -60,
            left: '50%', transform: 'translateX(-50%)'
          }}
        />

        <Box sx={{ mt: 8, flexGrow: 1, width: '100%' }}>
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 4, textAlign: 'left' }}>
            Get your random joke
          </Typography>
          
          <Typography variant="h6" sx={{ fontStyle: 'italic', color: 'text.primary', textAlign: 'left' }}>
            "{joke}"
          </Typography>
        </Box>

        {error && (
          <Alert severity='error' sx={{ mb: 2 }}>
            { error }
          </Alert>
        )}

        <Stack spacing={2} sx={{ width: '100%', mt: 'auto' }}>
          <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
            <TextField 
              fullWidth 
              label="Impersonate" 
              variant="outlined"
              value={impersonateName}
              onChange={(e) => setImpersonateName(e.target.value)}
              placeholder="Impersonate Chuck Norris"
              slotProps={{ inputLabel: { shrink: true } }}
              sx={{
                '& .MuiOutlinedInput-root fieldset': { borderColor: 'secondary.main' },
                '& .MuiInputLabel-root': { bgcolor: 'background.paper', px: 1, color: 'text.primary' }
              }}
            />
            <FormControl fullWidth>
              <InputLabel shrink sx={{ bgcolor: 'background.paper', px: 1, color: 'text.primary' }}>
                Categories
              </InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                displayEmpty
                renderValue={
                  (sel) => {
                    if(!sel) return <Typography sx={{ color: 'background.gray', opacity: 0.7}}> Categories... </Typography>;
                    return sel;
                  }
                }
                sx={{ '& fieldset': { borderColor: 'secondary.main' } }}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
            <Button 
              fullWidth variant="contained" 
              onClick={handleGetJoke}
              sx={{ py: 1.5, bgcolor: 'background.default', fontWeight: 700 }}
            >
              DRAW A RANDOM CHUCK NORRIS JOKE
            </Button>
            <Button 
              fullWidth variant="contained" 
              sx={{ py: 1.5, bgcolor: 'primary.main', color: 'white', fontWeight: 700 }}
              onClick={handleSaveJoke}
            >
              SAVE THIS JOKE
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
}
