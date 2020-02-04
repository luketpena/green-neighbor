const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/getName/:zip/:eia_state', async (req, res) => {
    try{
        const query = `
            SELECT "id", "utility_name"
            FROM "zips"
            WHERE "zip"=$1 AND "eia_state"=$2`
        const {rows} = await pool.query(query, [req.params.zip, req.params.eia_state]);
        res.send(rows[0]);
    } catch (error) {
        res.send(500);
        console.log(error);
    }
});

module.exports = router;