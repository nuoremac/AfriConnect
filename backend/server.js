const express = require('express');
const cors = require('cors');
const supabase = require('./supabaseClient'); // Import the client
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Basic route to check if the server is running
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

// API endpoint to fetch all CSOs
app.get('/api/csos', async (req, res) => {
  try {
    const { data, error } = await supabase.from('csos').select('*');
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API endpoint to post new CSO data
app.post('/api/csos', async (req, res) => {
  try {
    const { data, error } = await supabase.from('csos').insert([req.body]);
    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});