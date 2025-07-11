const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const createServer = require('./ptero');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/create', async (req, res) => {
  const { name } = req.body;
  try {
    const response = await createServer(name);
    res.json({ success: true, data: response });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Panel Free NodeJS berjalan di http://localhost:3000');
});