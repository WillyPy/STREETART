var pool = require("./connection");

module.exports.getAllProjects = async function () {
  try {
    let sql = "select * from projects ";
    let result = await pool.query(sql);
    let projects = result.rows;
    console.log(result);
    if (result.rows.length > 0) return { status: 200, result: projects };
    else return { status: 401, result: { msg: "Nenhum projecto encontrada" } };
  } catch (error) {
    console.log(error);
    return { status: 500, result: error };
  }
};
