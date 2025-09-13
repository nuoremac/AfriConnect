const express = require('express');
const cors = require('cors');
const supabase = require('./supabaseClient'); // Import du client Supabase

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// ✅ Route de base pour vérifier si le serveur tourne
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

// ✅ Endpoint 1 : récupérer toutes les OSC (avec filtres optionnels)
app.get('/api/csos', async (req, res) => {
  try {
    const { country, focus_areas } = req.query;
    let query = supabase.from('csos').select('*');

    if (country) {
      query = query.eq('country', country);
    }

    if (focus_areas) {
      query = query.contains('focus_areas', [focus_areas]);
    }

    const { data, error } = await query;
    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Endpoint 2 : ajouter une demande de collaboration
app.post('/api/collaboration_requests', async (req, res) => {
  try {
    const { cso_id, message } = req.body;
    const { data, error } = await supabase
      .from('collaboration_requests')
      .insert([{ cso_id, message }])
      .select();

    if (error) throw error;

    res.status(201).json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ✅ Lancer le serveur
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
