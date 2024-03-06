// server.mjs

import express from 'express';
import path from 'path';
import router from './route.mjs';
import { viewsDirectory } from './db.mjs';

const app = express();
const port = 3000;

// Middleware to parse JSON in the request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Obtain the current module's directory using __filename and __dirname
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

// Specify the correct views directory
app.set('views', viewsDirectory);

// Use the queries router
app.use('/', router);

// Render the query form
app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
