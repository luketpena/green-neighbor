const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

/**
 * GET route template
 */
router.get('/:zip', async (req, res) => {
    try {
        const query = `
        SELECT "gpp".*
        FROM "zips" JOIN  "gpp" ON "zips"."eia_state"="gpp"."eia_state"
        WHERE "zips"."zip"=$1 AND "gpp"."production"=1`
        let programs = await pool.query(query, [req.params.zip]);
        programs = programs.rows;
        const dataToSend = [];
        console.log(programs);
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
        console.log(JSON.stringify(dataToSend));
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

router.get('/geocode/:zip', (req,res)=>{

  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.params.zip}&sensor=true&key=${process.env.GEOCODE_API_KEY}`)
  .then(response=>{
    res.send(response.data.results[0].formatted_address);
    console.log('Back from API request. Zip:',req.params.zip,'Key:',process.env.GEOCODE_API_KEY);
    
  }).catch(error=>{
    console.log('Error getting geocode data from API:',error);   
    res.sendStatus(400);
  })
})

module.exports = router;