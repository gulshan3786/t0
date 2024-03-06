// route.mjs
import express from 'express';
import { db } from './db.mjs';

const router = express.Router();
const RESULTS_PER_PAGE = 10;

// Handle form submission and render paginated results for both GET and POST requests
router.all('/executeQuery', (req, res) => {
  let { query, page } = req.method === 'POST' ? req.body : req.query;
  page = parseInt(page, 10) || 1;

  const offset = (page - 1) * RESULTS_PER_PAGE;

  db.query(`${query} LIMIT ?, ?`, [offset, RESULTS_PER_PAGE], (error, results) => {
    if (error) {
      console.error('Error executing the query:', error);
      return res.status(500).json({ error: 'Error executing the query.' });
    }

    db.query(`SELECT COUNT(*) as totalCount FROM (${query}) AS subquery`, (countError, countResults) => {
      if (countError) {
        console.error('Error fetching total count:', countError);
        return res.status(500).json({ error: 'Error fetching total count.' });
      }

      const totalCount = countResults[0].totalCount;
      const totalPages = Math.ceil(totalCount / RESULTS_PER_PAGE);

      res.render('results', {
        data: results,
        page: page,
        totalPages: totalPages,
      });
    });
  });
});

export default router;
