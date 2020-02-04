const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// send in req.query the column name and value to search for
router.get('/', async (req, res) => {
    try{
        const equalQueries = [
            'id', 'resolved', 'zip', 'utility_id', 'program_id'
        ];
        const ilikeQueries = [
            'utility_name', 'program_name', 'comments'
        ];
        const config = [];
        const conditions = [];
        Object.entries(req.query).forEach(([key, value]) => {
            if(equalQueries.includes(key)){
                config.push(value);
                conditions.push(`${key}=$${config.length}`);
            } else if (ilikeQueries.includes(key)){
                config.push(`%${value}%`);
                conditions.push(`${key} ILIKE $${config.length}`);
            }
        });

        let orderBy = 'id';
        if(req.query.orderBy){
            if( equalQueries.includes(req.query.orderBy) ||
                ilikeQueries.includes(req.query.orderBy) )
            {
                orderBy = req.query.orderBy;
            }
        }

        const order = req.query.order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

        const query = `
            SELECT * FROM "tickets"
            ${conditions.length ? `WHERE ${conditions.join(' AND ')}`: ''}
            ORDER BY ${orderBy} ${order}`;

        const {rows} = await pool.query(query, config);
        res.send(rows);
    } catch (error) {
        res.sendStatus(500);
        console.log(error);
    }
});

// in req.body, just send keys = column names to enter into
// and values = actual values to enter.
router.post('/', async (req, res) => {
    try{
        const acceptedKeys = [
            'resolved', 'zip', 'utility_name',
            'utility_id', 'program_name', 'program_id',
            'comments'
        ];
        const config = [];
        const values = [];

        // for each key in req.body that is in acceptedKeys,
        // add $1 or $2 etc to values, add the value itself to
        // config, and map into keys the key itself.
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
            console.log(req.body);
        await pool.query(query, config);
        
        

        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
        console.log(error);
    }
});

module.exports = router;