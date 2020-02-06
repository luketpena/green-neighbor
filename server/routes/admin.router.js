const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/overview', async (req, res) => {
    try {
      const ticketQuery = `
        SELECT 
          SUM(
            case
              WHEN resolved=true THEN 1
              ELSE 0
            END
          ) as tickets_resolved,	
          SUM(
            case
              WHEN resolved=false THEN 1
              ELSE 0
            END
          ) as tickets_active
        FROM tickets;
      `;
      const ticketInfo = await pool.query(ticketQuery);
      const programQuery = `
        SELECT 
          SUM(
            case
              WHEN production=1 THEN 1
              ELSE 0
            END
          ) as programs_live,
          SUM(
            case
              WHEN production=0 THEN 1
              ELSE 0
            END
          ) as programs_draft 	
        FROM gpp;
      `;
      const programInfo = await pool.query(programQuery);
      res.send({...ticketInfo.rows[0], ...programInfo.rows[0]});
    } catch(error) {
      console.log('Error getting admin overview data:',error);
      res.sendStatus(500);
    }
});

module.exports = router;