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


// API endpoint to fetch CSOs with multiple filters
app.get('/api/csos', async (req, res) => {
  try {
    const { country, focus_areas } = req.query;
    let query = supabase.from('csos').select('*'); // Base query starts here

    // Chain the filters together. The order doesn't matter.
    if (country) {
      query = query.eq('country', country);
    }

    if (focus_areas) {
      // Supabase's `.contains()` method for array columns
      query = query.contains('focus_areas', [focus_areas]);
    }

    const { data, error } = await query; // Execute the final chained query

    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// API endpoint to post new CSO data
/*app.post('/api/csos', async (req, res) => {
  try {
    const { data, error } = await supabase.from('csos').insert([req.body]);
    if (error) throw error;
    res.status(201).json(data); //<-- if successful will return null to the
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});*/

app.post('/api/csos', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('csos')
      .insert([req.body])
      .select(); // <--- Add .select() here

    if (error) throw error;

    // Supabase returns an array, so get the first item
    res.status(201).json(data[0]); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
