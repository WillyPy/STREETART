var pool = require("./connection");

module.exports.getAllArtists = async function () {
  try {
    let sql = "select * from artists ";
    let result = await pool.query(sql);
    let artists = result.rows;
    console.log(result);
    if (result.rows.length > 0) return { status: 200, result: artists };
    else return { status: 401, result: { msg: "Nenhum artista encontrada" } };
  } catch (error) {
    console.log(error);
    return { status: 500, result: error };
  }
};
module.exports.getArtistArts = async function (id) {
  try {
    let sql = `select * from artists inner join arts_artists on  artist_id=artist_fk_id 
inner join arts on art_fk_id= art_id where artist_id=$1`;
    let result = await pool.query(sql, [id]);
    if (result.rows.length > 0) return { status: 200, result: result.rows };
    else return { status: 404, result: { msg: "artist not found" } };
  } catch (error) {
    console.log(error);
    return { status: 500, result: error };
  }
};
