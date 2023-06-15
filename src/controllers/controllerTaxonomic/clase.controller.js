const pool = require("../../db");

const getAllClase = async (req, res, next) => {
    try {
        const allTasks = await pool.query("SELECT cla_id, fil_id, cla_cla_id, cla_nombre  FROM clase order by cla_nombre asc");
        res.json(allTasks.rows);

    } catch (error) {
        next(error)
    }
};

const getClaseByFilo = async (req, res, next) => {

    const consult =
        "SELECT clase.cla_nombre " +
        "FROM clase " +
        "JOIN filo ON clase.fil_id = filo.fil_id " +
        "WHERE filo.fil_nombre = $1 " +
        "ORDER BY clase.cla_nombre ASC ";

    try {
        const { filo } = req.params

        const result = await pool.query(consult, [filo]);

        console.log(result)

        if (result.rows.length === 0)
            return res.status(404).json({
                message: "No existe clases con el filo seleccionado"
            });
        //return res.json(result.rows[0]); si pongo [0] me devuelve la primera respuesta
        return res.json(result.rows);

    } catch (error) {
        next(error)
    }


};

const getClase = async (req, res, next) => {
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

const createClase = async (req, res) => {
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

const deleteClase = async (req, res) => {

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

const updateClase = async (req, res) => {
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
    getAllClase,
    getClaseByFilo,
    getClase,
    createClase,
    deleteClase,
    updateClase
}