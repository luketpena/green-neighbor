const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:zip', async (req, res) => {
    try {
        const query = `
        SELECT "gpp".*
        FROM "zips" LEFT JOIN  "gpp" ON "zips"."eia_state"="gpp"."eia_state"
        WHERE "zips"."zip"=$1 AND "gpp"."production"=1`
        let programs = await pool.query(query, [req.params.zip]);
        programs = programs.rows;
        const dataToSend = [];
        programs.forEach(program => {
            let i = 0;
            for(; i < dataToSend.length && dataToSend[i].name !== program.utility_name; i++);
            if(i === dataToSend.length){
                dataToSend.push({
                    name: program.utility_name,
                    programs: []
                });
            }
            delete program.utility_name;
            dataToSend[i].programs.push(program);
        });

        res.send(dataToSend);
    } catch(error){
        res.sendStatus(500);
        console.log('-------- ERROR GETTING PROGRAMS AT ZIP -------- \n', error);
    }
});

router.get('/details/:id', async (req, res) => {
    try{
        const query = `
        SELECT * FROM "gpp" WHERE "id"=$1`;
        const results = await pool.query(query, [req.params.id]);
        res.send(results.rows);
    } catch (error){
        res.sendStatus(500);
        console.log('-------- ERROR GETTING PROGRAM DETAILS -------- \n', error);
    }
});

module.exports = router;