const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    
});

/**
 * POST route template
 */
router.post('/', async (req, res) => {
    try{
        const acceptedKeys = [
            'resolved', 'zip', 'utility_name',
            'utility_id', 'program_name', 'program_id',
            'comments'
        ];
        const config = [];
        const values = [];
        const keys = Object.entries(req.body)
            .filter(([key]) => acceptedKeys.includes(key))
            .map(([key, value], i) => {
                values.push(`$${i+1}`);
                config.push(value);
                return key;
            }).join(', ');
        
        const query = `
            INSERT INTO "tickets" (${keys})
            VALUES (${values.join(', ')})`;

        await pool.query(query, config);

        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
        console.log(error);
    }
});

module.exports = router;