const pool = require("../../db");

const getAllFamilia = async (req, res, next) => {
    try {
        const allTasks = await pool.query("SELECT fam_id, ord_id, fam_fam_id, gen_nombre FROM familia order by gen_nombre asc");
        res.json(allTasks.rows);

    } catch (error) {
        next(error)
    }
};

const getFamiliaByOrden = async (req, res, next) => {

    const consult =
        "SELECT familia.gen_nombre " +
        "FROM familia " +
        "JOIN orden ON familia.ord_id = orden.ord_id " +
        "WHERE orden.ord_nombre = $1 " +
        "ORDER BY familia.gen_nombre ASC ";

    try {
        const { orden } = req.params

        const result = await pool.query(consult, [orden]);

        console.log(result)

        if (result.rows.length === 0)
            return res.status(404).json({
                message: "No existe orden con la familia seleccionado"
            });
        //return res.json(result.rows[0]); si pongo [0] me devuelve la primera respuesta
        return res.json(result.rows);

    } catch (error) {
        next(error)
    }


};

const getFamilia = async (req, res, next) => {
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

const createFamilia = async (req, res) => {
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

const deleteFamilia = async (req, res) => {

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

const updateFamilia = async (req, res) => {
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
    getAllFamilia,
    getFamiliaByOrden,
    getFamilia,
    createFamilia,
    deleteFamilia,
    updateFamilia
}