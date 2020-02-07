const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

// send in req.query the column name and value to search for
router.get('/', rejectUnauthenticated, async (req, res) => {
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

        const order = req.query.order && req.query.order.toUpperCase() === 'ASC' ?
            'ASC' : 'DESC';

        const ticketsQuery = `
            SELECT * FROM "tickets"
            ${conditions.length ? `WHERE ${conditions.join(' AND ')}`: ''}
            ORDER BY ${orderBy} ${order}
            LIMIT $${config.length+1}
            OFFSET $${config.length+2}`;

        const countQuery = `
            SELECT COUNT(*) FROM "tickets"
            ${conditions.length ? `WHERE ${conditions.join(' AND ')}`: ''}
        `;

        const countResults = await pool.query(countQuery, config);
        const count = countResults.rows[0];

        config.push(req.body.limit || 100, req.body.offset || 0);
        const {rows: tickets} = await pool.query(ticketsQuery, config);

        res.send({tickets, count});
    } catch (error) {
        res.sendStatus(500);
        console.log(error);
    }
});

// in req.body, just send keys = column names to enter into
// and values = actual values to enter.
router.post('/', async (req, res) => {
    try{
        console.log(req.body)
        const acceptedKeys = [
            'resolved', 'zip', 'utility_name',
            'utility_id', 'program_name', 'gpp_id',
            'email', 'comments'
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
        await pool.query(query, config);
        console.log(query, config);
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
        console.log(error);
    }
});

module.exports = router;