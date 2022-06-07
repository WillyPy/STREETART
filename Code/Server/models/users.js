var pool = require("./connection");
var bcrypt = require("bcrypt");
var salt = 10;

module.exports.getAllUsers = async function () {
  try {
    let sql = "select * from users inner join artists on user_id=user_fk_id";
    let result = await pool.query(sql);
    for (let res of result.rows) delete res.user_password;
    let users = result.rows;
    console.log(result);
    return { status: 200, result: users };
  } catch (error) {
    console.log(error);
    return { status: 500, result: error };
  }
};
module.exports.getUserById = async function (id) {
  try {
    let sql = "select * from users  where user_id =$1";
    let result = await pool.query(sql, [id]);
    for (let res of result.rows) delete res.user_password;
    if (result.rows.length > 0) return { status: 200, result: result.rows[0] };
    else return { status: 404, result: { msg: "User not found" } };
  } catch (error) {
    console.log(error);
    return { status: 500, result: error };
  }
};
module.exports.loginUser = async function (user) {
  try {
    let sql =
      "Select * from users inner join artists on user_id=user_fk_id  where user_username = $1";
    let result = await pool.query(sql, [user.username]);
    let passwordb = result.rows[0].user_password;
    let valor = bcrypt.compareSync(user.password, passwordb);

    if (result.rows.length > 0 && valor) {
      for (let res of result.rows[0]) delete res.user_password;
      return {
        status: 200,
        result: result.rows[0],
      };
    } else return { status: 401, result: { msg: "Wrong email or password" } };
  } catch (error) {
    console.log(error);
    return { status: 500, result: { msg: "Wrong username or password" } };
  }
};
module.exports.newUser = async function (user) {
  let hash = bcrypt.hashSync(user.password, salt);
  let sql;
  let result;

  try {
    if (user.artist) {
      sql = ` WITH upd AS (			 
insert into users(user_firstname, user_lastname, user_username, user_email,user_password,user_bdate,user_gender) 
values($1,$2,$3,$4,$5,$6,$7) returning user_id)
insert into artists(user_fk_id, artist_name ) select user_id,$8 from upd;`;
      result = await pool.query(sql, [
        user.firstName,
        user.lastName,
        user.username,
        user.email,
        hash,
        user.bdate,
        user.gener,
        user.artist,
      ]);
    }

    return { status: 200, result: result };
  } catch (error) {
    console.log(error);
    return { status: 500, result: error };
  }
};
