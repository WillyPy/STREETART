var pg = require("pg");

const connectionString =
  "postgres://yjrebhnm:vzeYWKe7vGpHpLhNbE_2f_k4mYKLeEO-@rogue.db.elephantsql.com/yjrebhnm";

const Pool = pg.Pool;
const pool = new Pool({
  connectionString,
  max: 10,
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
});

module.exports = pool;
