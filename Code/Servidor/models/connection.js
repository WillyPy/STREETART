var pg = require("pg");

//const connectionString ="postgres://bzvfvvqu:hpNSZKZrOBiAlCdQn0_b4I0z_pknn8_d@surus.db.elephantsql.com/bzvfvvqu";
const connectionString = "postgres://postgres:junior@localhost:5432/streetart";
const Pool = pg.Pool;
const pool = new Pool({
  connectionString,
  max: 10,
  /* ssl: {
    require: true,
    rejectUnauthorized: false,
  },*/
});

module.exports = pool;
