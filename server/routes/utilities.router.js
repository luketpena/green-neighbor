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

function stringifyQueries(query,paramsArray) {

  //>>Collects the starting data to modify and return
  let final = {
    string: '',
    params: [...paramsArray],
    paramsStart: paramsArray.length
  };

  //>> Adds the junction to reflect position in filter string
  function conjunctionFunction(array) {
    return (array.length===final.paramsStart+1? ' WHERE ' : ' AND ');
  }

  //>> Builds a string to filter by
  for (let [key,value] of Object.entries(query)) {
      
    switch(key) {
      case 'state':
      case 'utility_name':
      case 'program_name':
        final.params.push('%'+value+'%');
        final.string += conjunctionFunction(final.params);
        final.string += `${(key==='program_name'? 'g':'z')}.${key} ILIKE $${final.params.length}`;
        break;
      case 'show':
        switch(value) {
          case 'active': final.params.push(true); break;
          case 'drafts': final.params.push(false); break;
        }   
        if (value!=='all') {
          final.string += conjunctionFunction(final.params);
          final.string += `z.production=$${final.params.length}`;
        }
        break;
      case 'zip':
        final.params.push(Number(value));
        final.string += conjunctionFunction(final.params);
        final.string += `z.zip=$${final.params.length}`;
        break;
    }
  }
  return final;
}

router.get('/count', async(req,res)=>{

  console.log(req.query);

  
  try {

    let query = `
      SELECT COUNT(DISTINCT z.eia_state) FROM zips z
      LEFT JOIN gpp g ON z.eia_state = g.eia_state
    `;
    let queryParams = [];
    
    const modify = stringifyQueries(req.query,queryParams);
    query += modify.string;
    queryParams = [...modify.params];
  
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
  //console.log(req.query);
  
  try {
    let query = `
    SELECT ARRAY_AGG("zips") as zips, eia_state, utility_name, state,
    program_count, programs
    FROM (
      SELECT json_build_object('id', z.id, 'production', z.production, 'zip', z.zip) as "zips",
        z.eia_state, z.utility_name, z.state,
        COUNT(g.utility_name) as program_count,
        array_agg(
          jsonb_build_object('name', g.program_name, 'id', g.id, 'production', g.production)
          ORDER BY g.id
        ) as programs
      FROM zips as z
      LEFT JOIN gpp g ON z.eia_state=g.eia_state
    `;

    let queryParams = [req.params.page*100];
    const modify = stringifyQueries(req.query,queryParams);
    query += modify.string;
    queryParams = [...modify.params];
      

    
    let order = '';
    switch(req.query.order) {
      case 'utility_name': order = 'utility_name'; break;
      case 'state': order = 'state'; break;
      case 'zip': order = 'zips'; break;
      case 'program_count': order = 'program_count'; break;
      case 'production': order = 'production'; break;
    }

    let dir = (req.query.orderDir==='ASC'? 'ASC' : 'DESC');
    

    query += `
      GROUP BY z.id
      ) AS td
      GROUP BY eia_state, utility_name, state, program_count, programs
      ORDER BY ${order} ${dir}
      LIMIT 100 OFFSET $1;`;

    console.log(query, queryParams);
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