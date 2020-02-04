const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const dotenv = require('dotenv');
dotenv.config();
const gppCols =  require('../modules/gppColumns');

/**
 * GET route template
 */
router.get('/:zip', async (req, res) => {
    try {
        const zipsCols = [
            'zip', 'eiaid', 'utility_name',
            'state', 'eia_state'
        ]
        const cols = gppCols.filter(col => !zipsCols.includes(col));
        const query = `
        SELECT ${zipsCols.map(col => `"zips"."${col}"`).join(', ')}, "zips"."id" AS "zip_id",
            ${cols.map(col => `"gpp"."${col}"`).join(', ')}
        FROM "zips" LEFT JOIN  (
            SELECT * FROM "gpp" WHERE "gpp"."production"=1
        ) AS "gpp" ON "zips"."eia_state"="gpp"."eia_state"
        WHERE "zips"."zip"=$1;`;
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

router.get('/geocode/:zip', (req,res)=>{

  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.params.zip}&sensor=true&key=${process.env.GEOCODE_API_KEY}`)
  .then(response=>{
    res.send(response.data.results[0].formatted_address);
    console.log('Back from API request. Zip:',req.params.zip,'Key:',process.env.GEOCODE_API_KEY);
    
  }).catch(error=>{
    console.log('Error getting geocode data from API:',error);   
    res.sendStatus(400);
  })
});

// router.post('/create', rejectUnauthenticated, async (req, res) => {
router.post('/create', async (req, res) => {
    try{
        if(req.body.id) delete req.body.id;
        const injectors = [];
        const config = [];
        const cols = Object.entries(req.body)
            .filter(([key]) => gppCols.includes(key))
            .map(([key, value], i) => {
                config.push(value);
                injectors.push(`$${config.length}`);
                return key;
            }).join(', ');
        const query = `
            INSERT INTO "gpp" (${cols}) VALUES (${injectors.join(', ')})`;
        
        await pool.query(query, config);
        res.sendStatus(200);
    } catch (error){ 
        res.sendStatus(500);
        console.log(error);
    }
});

// router.put('/update/:id', rejectUnauthenticated, async (req, res) => {
router.put('/update/:id', async (req, res) => {
    try{
        const config = [req.params.id];
        req.body.date_updated = new Date();
        const cols = Object.entries(req.body)
            .filter(([key]) => gppCols.includes(key))
            .map(([key, value], i) => {
                config.push(value);
                return `${key}=$${config.length}`;
            }).join(', ');

        const query = `
            UPDATE "gpp" SET ${cols}
            WHERE "gpp"."id"=$1`;

        await pool.query(query, config);
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
        console.log(error);
    }
});

module.exports = router;