const pool = require("../../db");

const getAllGenero = async (req, res, next) => {
    try {
        const allTasks = await pool.query("SELECT ord_id, cla_id, ord_ord_id, ord_nombre  FROM familia order by ord_nombre asc");
        res.json(allTasks.rows);

    } catch (error) {
        next(error)
    }
};

const getGeneroByFamilia = async (req, res, next) => {

    const consult =
        "SELECT genero.gen_nombre " +
        "FROM genero " +
        "JOIN familia ON genero.fam_id = familia.fam_id " +
        "WHERE familia.gen_nombre = $1 " +
        "ORDER BY genero.gen_nombre ASC ";

    try {
        const { familia } = req.params

        const result = await pool.query(consult, [familia]);

        console.log(result)

        if (result.rows.length === 0)
            return res.status(404).json({
                message: "No existe familia con la familia seleccionado"
            });
        //return res.json(result.rows[0]); si pongo [0] me devuelve la primera respuesta
        return res.json(result.rows);

    } catch (error) {
        next(error)
    }


};



const getGenero = async (req, res, next) => {
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

const getGenNombre = async (req, res, next) => {
    try {
        const { genero_nombre } = req.params

        const result = await pool.query('SELECT gen_id FROM genero WHERE gen_nombre = $1', [genero_nombre])
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


const createGenero = async (req, res) => {
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

const deleteGenero = async (req, res) => {

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

const updateGenero = async (req, res) => {
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
    getAllGenero,
    getGeneroByFamilia,
    getGenero,
    getGenNombre,
    createGenero,
    deleteGenero,
    updateGenero
}