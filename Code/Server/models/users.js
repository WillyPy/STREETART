var pool = require("./connection");
/*var bcrypt = require("bcrypt");
var salt = 10;*/

module.exports.getAllUsers = async function () {
  try {
    let sql = "select * from users";
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
    let sql = "select * from users where user_id =$1";
    let result = await pool.query(sql, [id]);
    for (let res of result.rows) delete res.user_password;
    if (result.rows.length > 0) return { status: 200, result: result.rows[0] };
    else return { status: 404, result: { msg: "User not found" } };
  } catch (error) {
    console.log(error);
    return { status: 500, result: error };
  }
};
/*
module.exports.saveUser = async function (user) {
  let hash = bcrypt.hashSync(user.password, salt);
  try {
    let sql = ` WITH upd AS (			 
insert into users(user_firstname, user_lastname, user_username, user_email,user_password,user_bdate,user_gender) 
values($1,$2,$3,$4,$5,$6,$7) returning user_id)
insert into artists(user_fk_id, artist_name ) select user_id,$8 from upd;`;
    let result = await pool.query(sql, [
      user.firstName,
      user.lastName,
      user.username,
      user.email,
      hash,
      user.bdate,
      user.gener,
      user.artist,
    ]);
    return { status: 200, result: result };
  } catch (error) {
    console.log(error);
    return { status: 500, result: error };
  }
};*/
