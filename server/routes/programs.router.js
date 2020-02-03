const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const gppCols =  require('../modules/gppColumns');

/**
 * GET route template
 */
router.get('/:zip', async (req, res) => {
    try {
        const zipsCols = [
            'id', 'zip', 'eiaid', 'utility_name',
            'state', 'eia_state'
        ]
        const cols = gppCols.filter(col => !zipsCols.includes(col));
        const query = `
        SELECT ${zipsCols.map(col => `"zips"."${col}"`).join(', ')},
            ${cols.map(col => `"gpp"."${col}"`).join(', ')}, "gpp"."id" AS "gpp_id"
        FROM "zips" LEFT JOIN  (
            SELECT * FROM "gpp" WHERE "gpp"."production"=1
        ) AS "gpp" ON "zips"."eia_state"="gpp"."eia_state"
        WHERE "zips"."zip"=$1`
        let programs = await pool.query(query, [req.params.zip]);
        programs = programs.rows;
        const dataToSend = [];
        programs.forEach(program => {
            let i = 0;
            for(; i < dataToSend.length && dataToSend[i].name !== program.utility_name; i++);
            if(i === dataToSend.length){
                dataToSend.push({
                    name: program.utility_name,
                    zip: program.zip,
                    eiaid: program.eiaid,
                    state: program.state,
                    programs: []
                });
            }
            delete program.zip;
            delete program.eiaid;
            delete program.state;
            delete program.utility_name;
            if(program.program_name){
                dataToSend[i].programs.push(program);
            }
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
        res.send(results.rows[0]);
    } catch (error){
        res.sendStatus(500);
        console.log('-------- ERROR GETTING PROGRAM DETAILS -------- \n', error);
    }
});

module.exports = router;