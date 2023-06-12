const pool = require("../../db");

const getAllState = async (req, res, next) => {
    try {
        const allTasks = await pool.query("SELECT * FROM provincia");
        res.json(allTasks.rows);

    } catch (error) {
        next(error)
    }
};

const getStates = async (req, res, next) => {
    try {
        const { id } = req.params

        const result = await pool.query('SELECT * FROM provincia WHERE pas_id = $1', [id])
        console.log(result)

        if (result.rows.length === 0)
            return res.status(404).json({
                message: "ninguna provincia asignada al pais"
            });
        //return res.json(result.rows[0]);
        return res.json(result.rows);
    } catch (error) {
        next(error)
    }

};

const getStateByCountry = async (req, res, next) => {

    const consult =
        "SELECT provincia.pro_nombre " +
        "FROM provincia " +
        "JOIN pais ON provincia.pas_id = pais.pas_id " +
        "WHERE pais.pas_nombre = $1 " +
        "ORDER BY provincia.pro_nombre ASC ";

    try {
        const { pais } = req.params

        const result = await pool.query(consult, [pais]);

        console.log(result)

        if (result.rows.length === 0)
            return res.status(404).json({
                message: "No existe provincias con el pais seleccionado"
            });
        //return res.json(result.rows[0]); si pongo [0] me devuelve la primera respuesta
        return res.json(result.rows);

    } catch (error) {
        next(error)
    }


};

const createState = async (req, res) => {
    const { pas_id, pro_nombre } = req.body

    try {
        const result = await pool.query(
            "INSERT INTO provincia (pas_id, pro_nombre) VALUES ($1,$2) RETURNING *",
            [pas_id, pro_nombre]
        );

        res.json(result.rows[0]);

    } catch (error) {
        next(error)
    }
};

const deleteState = async (req, res) => {

    const { id } = req.params

    try {
        const result = await pool.query("DELETE FROM provincia WHERE pro_id = $1", [id])
        if (result.rowCount === 0)
            return res.status(404).json({
                message: "provincia no encontrado"
            })
        return res.sendStatus(204);
    } catch (error) {
        next(error)
    }
};

const updateState = async (req, res) => {
    try {
        const { id } = req.params;
        const { pas_id, pro_nombre } = req.body;

        const result = await pool.query(
            "UPDATE pais SET pas_id = $1, pro_nombre= $2  WHERE pas_id = $3 RETURNING *",
            [pas_id, pro_nombre, id]
        );

        if (result.rows.length === 0)
            return res.status(404).json({
                message: "provincia no encontrado",
            });

        return res.json(result.rows[0]);
    } catch (error) {
        next(error)
    }


}


module.exports = {
    getAllState,
    getStateByCountry,
    getStates,
    createState,
    deleteState,
    updateState
}