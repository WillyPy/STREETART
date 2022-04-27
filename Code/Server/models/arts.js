var pool = require("./connection");

module.exports.getAllArts = async function () {
  try {
    let sql = "select * from arts inner join images on art_id=art_fk_id";
    let result = await pool.query(sql);
    let arts = result.rows;
    console.log(result);
    if (result.rows.length > 0) return { status: 200, result: arts };
    else return { status: 401, result: { msg: "Nenhuma arte encontrada" } };
  } catch (error) {
    console.log(error);
    return { status: 500, result: error };
  }
};

module.exports.getArtById = async function (id) {
  try {
    let sql = "select * from arts where art_id=$1";
    let result = await pool.query(sql, [id]);
    for (let res of result.rows) delete res.user_password;
    if (result.rows.length > 0) return { status: 200, result: result.rows[0] };
    else return { status: 404, result: { msg: "Art not found" } };
  } catch (error) {
    console.log(error);
    return { status: 500, result: error };
  }
};

module.exports.getArtImages = async function (id) {
  try {
    let sql = "select * from images where art_fk_id=$1";
    let result = await pool.query(sql, [id]);
    for (let res of result.rows) delete res.user_password;
    if (result.rows.length > 0) return { status: 200, result: result.rows };
    else return { status: 404, result: { msg: "Art images not found" } };
  } catch (error) {
    console.log(error);
    return { status: 500, result: error };
  }
};
