const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/* 
  Gets just then name of a utility company and its ID.
  Used on the details page once a program is selected
*/
router.get('/getName/:zip/:eia_state', async (req, res) => {
    try{
        const query = `
            SELECT "id" AS "zips_id", "utility_name"
            FROM "zips"
            WHERE "zip"=$1 AND "eia_state"=$2`
        const {rows} = await pool.query(query, [req.params.zip, req.params.eia_state]);
        res.send(rows[0]);
    } catch (error) {
        res.sendStatus(500);
        console.log('Error getting utility company name:',error);
    }
});

/*
  Get the count of all utility companies in the database.
*/
router.get('/count', async(req,res)=>{

  console.log(req.query);

  
  try {

    let query = `
      SELECT COUNT(z.id) FROM zips z
      LEFT JOIN gpp g ON z.eia_state = g.eia_state
    `;
    const queryParams = [];
    let conjunctionCount = 0;

    for (let [key,value] of Object.entries(req.query)) {
      
      switch(key) {
        case 'state':
        case 'utility_name':
        case 'program_name':
          queryParams.push('%'+value+'%');
          break;
        case 'show':
          switch(value) {
            case 'active': queryParams.push(true); break;
            case 'drafts': queryParams.push(false); break;
          }
          break;
        case 'zip':
          queryParams.push(Number(value));
          break;
      }

      if (queryParams.length>0) {
        if (conjunctionCount<queryParams.length) {
          query += (queryParams.length===1? ' WHERE ' : ' AND ');
          conjunctionCount++;
        }
      }
      
      switch(key) {
        case 'state': query += `z.state ILIKE $${queryParams.length}`; break;
        case 'zip': query += `z.zip=$${queryParams.length}`; break;
        case 'utility_name': query += `z.utility_name ILIKE $${queryParams.length}`; break;
        case 'program_name': query += `g.program_name ILIKE $${queryParams.length}`; break;
        case 'show': (value!=='all'? query += `z.production=$${queryParams.length}` : ''); break;
      }
    }
      
    query += ` GROUP BY z.id`;
    query = 'SELECT COUNT(*) FROM (' + query + ') as utility_count';

    const result = await pool.query(query,queryParams);
    res.send(result.rows[0]);
  } catch(error) {
    res.sendStatus(500);
    console.log('Error getting count of utilities:', error);
    
  }
})

/* 
  Get a summary of all utility companies.
  NOTE: Filters and sorts will be added to this eventually.
*/
router.get('/summary/:page', async(req,res)=>{
  console.log(req.query);
  
  try {
    let query = `
    SELECT z.id, z.eia_state, z.utility_name, z.zip, z.state, COUNT(g.utility_name) as program_count, ARRAY_AGG(g.program_name) as program_list, ARRAY_AGG(g.id) as program_id, z.production FROM zips z
      LEFT JOIN gpp g ON z.eia_state=g.eia_state

    `;

    const queryParams = [req.params.page*100];
    let conjunctionCount = 0;

    for (let [key,value] of Object.entries(req.query)) {
      
      switch(key) {
        case 'state':
        case 'utility_name':
        case 'program_name':
          queryParams.push('%'+value+'%');
          break;
        case 'show':
          switch(value) {
            case 'active': queryParams.push(true); break;
            case 'drafts': queryParams.push(false); break;
          }
          break;
        case 'zip':
          queryParams.push(Number(value));
          break;
      }

      if (queryParams.length>0) {
        if (conjunctionCount<queryParams.length-1) {
          query += (queryParams.length===2? ' WHERE ' : ' AND ');
          conjunctionCount++;
        }
      }
      
      switch(key) {
        case 'state': query += `z.state ILIKE $${queryParams.length}`; break;
        case 'zip': query += `z.zip=$${queryParams.length}`; break;
        case 'utility_name': query += `z.utility_name ILIKE $${queryParams.length}`; break;
        case 'program_name': query += `g.program_name ILIKE $${queryParams.length}`; break;
        case 'show': (value!=='all'? query += `z.production=$${queryParams.length}` : ''); break;
      }
    }
      
    query += `
      GROUP BY z.id
      LIMIT 100 OFFSET $1;`;

    console.log('Incoming parameters:',queryParams);
    console.log('Final query:',query);
    

    const result = await pool.query(query,queryParams);
    
    res.send(result.rows);
  } catch(error) {
    res.sendStatus(500);
    console.log('Error getting utility summary list:', error);    
  }
});

/* 
  Posts a new utility company to the zips table.
*/
router.post('/', rejectUnauthenticated, async(req,res)=>{
  const {zip, eiaid, utility_name, state, eia_state, bundled_avg_comm_rate, bundled_avg_ind_rate, bundled_avg_res_rate, delivery_avg_comm_rate, delivery_avg_ind_rate, delivery_avg_res_rate} = req.body;
  const queryData = [zip, eiaid, utility_name, state, eia_state, bundled_avg_comm_rate, bundled_avg_ind_rate, bundled_avg_res_rate, delivery_avg_comm_rate, delivery_avg_ind_rate, delivery_avg_res_rate];
  try {
    const query = `
      INSERT INTO zips (zip, eiaid, utility_name, state, eia_state, bundled_avg_comm_rate, bundled_avg_ind_rate, bundled_avg_res_rate, delivery_avg_comm_rate, delivery_avg_ind_rate, delivery_avg_res_rate)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);
    `;
    await pool.query(query, queryData);
    res.sendStatus(201);
  } catch(error) {
    res.sendStatus(500);
    console.log('Error posting new utility company:',error);
  }
});

/* 
  Deletes a utility company from the zips table.
  Requires a user to be authenticated to permit deletion.
*/
router.delete('/:id', rejectUnauthenticated, async(req,res)=>{
  try {
    const query = `
      DELETE FROM zips WHERE id=$1;
    `;
    await pool.query(query, [req.params.id]);
    res.sendStatus(200);
  } catch(error) {
    res.sendStatus(500);
    console.log('Error deleting utility company:',error);    
  }
});

/* 
  Updates a utility company on the zips table.
  Requires a user to be authenticated to permit modification.
*/
router.put('/:id', rejectUnauthenticated, async(req,res)=>{
  const {zip, eiaid, utility_name, state, eia_state, bundled_avg_comm_rate, bundled_avg_ind_rate, bundled_avg_res_rate, delivery_avg_comm_rate, delivery_avg_ind_rate, delivery_avg_res_rate} = req.body;
  const queryData = [req.params.id, zip, eiaid, utility_name, state, eia_state, bundled_avg_comm_rate, bundled_avg_ind_rate, bundled_avg_res_rate, delivery_avg_comm_rate, delivery_avg_ind_rate, delivery_avg_res_rate];
  try {
    const query = `
      UPDATE zips 
      SET zip=$2, eiaid=$3, utility_name=$4, state=$5, eia_state=$6, bundled_avg_comm_rate=$7, bundled_avg_ind_rate=$8, bundled_avg_res_rate=$9, delivery_avg_comm_rate=$10, delivery_avg_ind_rate=$11, delivery_avg_res_rate=$12
      WHERE id=$1;
    `;
    await pool.query(query, queryData);
    res.sendStatus(200);
  } catch(error) {
    res.sendStatus(500);
    console.log('Error updating existing utility company:', error);
  }
});

/* 
  Updates the production status of a utility company.
*/
router.put('/production/:id', rejectUnauthenticated, async(req,res)=>{
  try {
    const query = `UPDATE zips SET production=$1 WHERE id=$2;`;
    await pool.query(query,[req.body.production,req.params.id]);
    res.sendStatus(200);
  } catch(error) {
    res.sendStatus(500);
    console.log('Error updating company production status:', error);
    
  }
})

module.exports = router;