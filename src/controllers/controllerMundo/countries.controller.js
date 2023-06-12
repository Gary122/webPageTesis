const pool = require("../../db");

const getAllCountries = async (req, res, next) => {
    try {
        const allTasks = await pool.query("SELECT pas_nombre FROM pais order by pas_nombre asc");
        res.json(allTasks.rows);

    } catch (error) {
        next(error)
    }
};

const getCountry = async (req, res, next) => {
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

const createCountry = async (req, res) => {
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

const deleteCountry = async (req, res) => {

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

const updateCountry = async (req, res) => {
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
    getAllCountries,
    getCountry,
    createCountry,
    deleteCountry,
    updateCountry
}