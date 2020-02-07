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
            SELECT "id", "utility_name"
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
  
  
  res.sendStatus(200);
  // try {
  //   console.log(req.body);
    
  //   const query = `SELECT COUNT(z.id) FROM zips z`;
  //   for (let i=0; i<queryInputs.length; i++) {
  //     if (queryInputs[i].value!=='') {
  //       //>> Add WHERE on first found valid parameter or AND on subsequent parameters
  //       query += (paramCount===0? 'WHERE ' : 'AND ');

  //       //>> Increment the parameter count
  //       paramCount++;
  //       //>> Add the specific parameter text
  //       switch(queryInputs[i].name) {
  //         case 'state': 
  //           query += `z.state ILIKE $${paramCount}`;
  //           queryParams.push('%'+queryInputs[i].value+'%');
  //           break;
  //       }
  //     }
  //   }
  //   const result = await pool.query(query,queryParams);
  //   res.send(result.rows[0]);
  // } catch(error) {
  //   res.sendStatus(500);
  //   console.log('Error getting count of utilities:', error);
    
  // }
})

/* 
  Get a summary of all utility companies.
  NOTE: Filters and sorts will be added to this eventually.
*/
router.get('/summary/:page', async(req,res)=>{
  try {
    const query = `
    SELECT z.id, z.eia_state, z.utility_name, z.zip, z.state, COUNT(g.utility_name) as program_count, ARRAY_AGG(g.program_name) as program_list, ARRAY_AGG(g.id) as program_id, z.production FROM zips z
      LEFT JOIN gpp g ON z.eia_state=g.eia_state
      GROUP BY z.id
      LIMIT 100 OFFSET $1;
    `;
    const result = await pool.query(query,[req.params.page*100]);
    
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