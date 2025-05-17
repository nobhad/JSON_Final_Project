const express = require('express');
const bodyParser = require('body-parser');
const nano = require('nano')('http://admin:puppy@localhost:5984');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static folders for pages and assets
app.use('/pages', express.static(path.join(__dirname, 'pages')));  // fixed here
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Paths
const dbFilePath = path.join(__dirname, 'db.json');

// CouchDB for testimonials only
const testimonialDbName = 'testimonials';

async function createDbIfNotExists(dbName) {
  try {
    const dbList = await nano.db.list();
    if (!dbList.includes(dbName)) {
      await nano.db.create(dbName);
      console.log(`CouchDB database '${dbName}' created.`);
    } else {
      console.log(`CouchDB database '${dbName}' exists.`);
    }
  } catch (err) {
    console.error(`Error creating or accessing CouchDB database '${dbName}':`, err);
  }
}

// Initialize testimonial DB and start server
async function startServer() {
  await createDbIfNotExists(testimonialDbName);
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();

const testimonialDb = nano.db.use(testimonialDbName);

// Helper to read contacts from JSON file
async function readContacts() {
  try {
    const data = await fs.readFile(dbFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      // file doesn't exist, return empty array
      return [];
    }
    throw err;
  }
}

// Helper to save contacts to JSON file
async function saveContacts(contacts) {
  await fs.writeFile(dbFilePath, JSON.stringify(contacts, null, 2));
}

// POST /submit-contact - save to local JSON file
app.post('/submit-contact', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;

    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    const newContact = {
      firstName,
      lastName,
      email,
      phone: phone || '',
      message,
      createdAt: new Date().toISOString()
    };

    const contacts = await readContacts();
    contacts.push(newContact);
    await saveContacts(contacts);

    res.status(201).json({ message: 'Contact submitted successfully' });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /contacts - view saved contact messages from db.json
app.get('/contacts', async (req, res) => {
  try {
    const contacts = await readContacts();
    res.json(contacts);
  } catch (error) {
    console.error('Error reading contacts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /submit-testimonial (still with CouchDB)
app.post('/submit-testimonial', async (req, res) => {
  try {
    const { firstName, lastName, dogName, message } = req.body;

    if (!firstName || !lastName || !dogName || !message) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    const doc = {
      firstName,
      lastName,
      dogName,
      message,
      createdAt: new Date().toISOString()
    };

    const response = await testimonialDb.insert(doc);

    res.status(201).json({ message: 'Testimonial submitted successfully', id: response.id });
  } catch (error) {
    console.error('Error saving testimonial:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /testimonials
app.get('/testimonials', async (req, res) => {
  try {
    const result = await testimonialDb.list({ include_docs: true });
    const testimonials = result.rows.map(row => row.doc);
    res.json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
