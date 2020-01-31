const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:zip', async (req, res) => {
    const query = `
    SELECT "gpp".*
    FROM "zips" JOIN  "gpp" ON "zips"."eia_state"="gpp"."eia_state"
    WHERE "zips"."zip"=$1`
    let programs = await pool.query(query, [req.params.zip]);
    programs = programs.rows;
    const dataToSend = [];
    programs.forEach(program => {
        let i = 0;
        for(; i < dataToSend.length; i++){
            if(dataToSend[i].name === program.utility_name) break;
        }
        if(i === dataToSend.length){
            dataToSend.push({
                name: program.utility_name,
                programs: []
            });
        }
        delete program.utility_name;
        dataToSend[i].programs.push(program);
    });
    console.log(JSON.stringify(dataToSend));
    res.send(dataToSend);
});

module.exports = router;