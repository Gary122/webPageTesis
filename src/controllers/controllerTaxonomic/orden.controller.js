const pool = require("../../db");

const getAllOrden = async (req, res, next) => {
    try {
        const allTasks = await pool.query("SELECT ord_id, cla_id, ord_ord_id, ord_nombre FROM orden order by ord_nombre asc");
        res.json(allTasks.rows);

    } catch (error) {
        next(error)
    }
};

//SELECT rei_id, rei_rei_id, rei_nombre  FROM reino order by rei_nombre asc

const getOrdenByClase = async (req, res, next) => {

    const consult =
        "SELECT orden.ord_nombre " +
        "FROM orden " +
        "JOIN clase ON orden.cla_id = clase.cla_id " +
        "WHERE clase.cla_nombre = $1 " +
        "ORDER BY orden.ord_nombre ASC ";

    try {
        const { clase } = req.params

        const result = await pool.query(consult, [clase]);

        console.log(result)

        if (result.rows.length === 0)
            return res.status(404).json({
                message: "No existe orden con la clase seleccionado"
            });
        //return res.json(result.rows[0]); si pongo [0] me devuelve la primera respuesta
        return res.json(result.rows);

    } catch (error) {
        next(error)
    }


};


const getOrden = async (req, res, next) => {
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

const createOrden = async (req, res) => {
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

const deleteOrden = async (req, res) => {

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

const updateOrden = async (req, res) => {
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
    getAllOrden,
    getOrdenByClase,
    getOrden,
    createOrden,
    deleteOrden,
    updateOrden
}