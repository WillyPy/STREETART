var pool = require("./connection");

module.exports.getAllArts = async function () {
  try {
    let sql = "select * from arts";
    let result = await pool.query(sql);
    let arts = result.rows;
    console.log(result);
    if (result.rows.length > 0) return { status: 200, result: users };
    else return { status: 401, result: "Nenhuma arte encontrada" };
  } catch (error) {
    console.log(error);
    return { status: 500, result: error };
  }
};
