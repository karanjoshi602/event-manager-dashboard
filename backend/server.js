require('dotenv').config({ path: __dirname + '/.env' })

const express = require('express');
const app = express();
const cors = require('cors');



app.use(cors());
app.use(express.json());

app.use('/api/events', require('./routes/eventRoutes'));




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
