const pool = require("../../db");

const getAllEspecie = async (req, res, next) => {
    try {
        const allTasks = await pool.query("SELECT esp_id, gen_id, esp_nombre, esp_sexo FROM especie order by esp_nombre asc");
        res.json(allTasks.rows);

    } catch (error) {
        next(error)
    }
};

const getEspecieByGenero = async (req, res, next) => {

    const consult =
        "SELECT especie.esp_nombre " +
        "FROM especie " +
        "JOIN genero ON especie.gen_id = genero.gen_id " +
        "WHERE genero.gen_nombre = $1 " +
        "ORDER BY especie.esp_nombre ASC ";

    try {
        const { genero } = req.params

        const result = await pool.query(consult, [genero]);

        console.log(result)

        if (result.rows.length === 0)
            return res.status(404).json({
                message: "No existe especie con el genero seleccionado"
            });
        //return res.json(result.rows[0]); si pongo [0] me devuelve la primera respuesta
        return res.json(result.rows);

    } catch (error) {
        next(error)
    }


};



const getEspecie = async (req, res, next) => {
    try {
        const { id } = req.params

        const result = await pool.query('SELECT * FROM pais WHERE pas_id = $1', [id])
        console.log(result)

        if (result.rows.length === 0)
            return res.status(404).json({
                message: "tarea no encontrada"
            });
        return res.json(result.rows[0]);
    } catch (error) {
        next(error)
    }

};

const createEspecie = async (req, res) => {
    const { pas_nombre } = req.body

    try {
        const result = await pool.query(
            "INSERT INTO pais (pas_nombre) VALUES ($1) RETURNING *",
            [pas_nombre]
        );

        res.json(result.rows[0]);

    } catch (error) {
        next(error)
    }
};

const deleteEspecie = async (req, res) => {

    const { id } = req.params

    try {
        const result = await pool.query("DELETE FROM pais WHERE pas_id = $1", [id])
        if (result.rowCount === 0)
            return res.status(404).json({
                message: "pais no encontrado"
            })
        return res.sendStatus(204);
    } catch (error) {
        next(error)
    }
};

const updateEspecie = async (req, res) => {
    try {
        const { id } = req.params;
        const { pas_nombre } = req.body;

        const result = await pool.query(
            "UPDATE pais SET pas_nombre = $1  WHERE pas_id = $2 RETURNING *",
            [pas_nombre, id]
        );

        if (result.rows.length === 0)
            return res.status(404).json({
                message: "pais no encontrado",
            });

        return res.json(result.rows[0]);
    } catch (error) {
        next(error)
    }


}


module.exports = {
    getAllEspecie,
    getEspecieByGenero,
    getEspecie,
    createEspecie,
    deleteEspecie,
    updateEspecie
}