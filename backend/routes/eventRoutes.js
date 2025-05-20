const express = require('express');
const router = express.Router();
const pool = require('../db'); 

// GET all events
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM events');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET one event by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM events WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new event
router.post('/', async (req, res) => {
  const { title, description, date, location } = req.body; 
  try {
    const result = await pool.query(
      'INSERT INTO events (title, description, date, location) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, description, date, location]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT (update) an event by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, date, location } = req.body; 
  try {
    const result = await pool.query(
      'UPDATE events SET title = $1, description = $2, date = $3, location = $4 WHERE id = $5 RETURNING *',
      [title, description, date, location, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE an event by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM events WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
