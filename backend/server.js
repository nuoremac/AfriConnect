const express = require('express');
const cors = require('cors');
const supabase = require('./supabaseClient');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// ✅ Endpoint 1 : récupérer toutes les OSC
app.get('/api/csos', async (req, res) => {
  const { data, error } = await supabase.from('csos').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// ✅ Endpoint 2 : ajouter une demande de collaboration
app.post('/api/collaboration_requests', async (req, res) => {
  const { cso_id, message } = req.body;
  const { data, error } = await supabase
    .from('collaboration_requests')
    .insert([{ cso_id, message }]);

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
