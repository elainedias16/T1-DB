const Pool = require('pg').Pool

const pool = new Pool({
  host: 'boca-db',
  port: 5432,
  user: 'postgres',
  password: 'superpass',
  database: 'bocadb',
})

// Basic test for connection
pool.query('SELECT * FROM problemtable', (error, results) => {
    if (error) {
      console.error('Error connecting to the database:', error);
    } else {
      console.log('Connected to the database. Result:', results.rows);
    }

    
});

  
module.exports = pool;