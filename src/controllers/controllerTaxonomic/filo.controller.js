const pool = require("../../db");

const getAllFilo = async (req, res, next) => {
    try {
        const allTasks = await pool.query("SELECT * FROM  filo ");
        res.json(allTasks.rows);

    } catch (error) {
        next(error)
    }
};

const getFiloByReino = async (req, res, next) => {

    const consult =
        "SELECT filo.fil_nombre " +
        "FROM filo " +
        "JOIN reino ON filo.rei_id = reino.rei_id " +
        "WHERE reino.rei_nombre = $1 " +
        "ORDER BY filo.fil_nombre ASC ";

    try {
        const { reino } = req.params

        const result = await pool.query(consult, [reino]);

        console.log(result)

        if (result.rows.length === 0)
            return res.status(404).json({
                message: "No existe filos con el reino seleccionado"
            });
        //return res.json(result.rows[0]); si pongo [0] me devuelve la primera respuesta
        return res.json(result.rows);

    } catch (error) {
        next(error)
    }


};

const getFilo = async (req, res, next) => {
    try {
        const { id } = req.params

        const result = await pool.query('SELECT * FROM reino WHERE pas_id = $1', [id])
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

const createFilo = async (req, res) => {
    const { pas_nombre } = req.body

    try {
        const result = await pool.query(
            "INSERT INTO reino (pas_nombre) VALUES ($1) RETURNING *",
            [pas_nombre]
        );

        res.json(result.rows[0]);

    } catch (error) {
        next(error)
    }
};

const deleteFilo = async (req, res) => {

    const { id } = req.params

    try {
        const result = await pool.query("DELETE FROM reino WHERE pas_id = $1", [id])
        if (result.rowCount === 0)
            return res.status(404).json({
                message: "reino no encontrado"
            })
        return res.sendStatus(204);
    } catch (error) {
        next(error)
    }
};

const updateFilo = async (req, res) => {
    try {
        const { id } = req.params;
        const { pas_nombre } = req.body;

        const result = await pool.query(
            "UPDATE reino SET pas_nombre = $1  WHERE pas_id = $2 RETURNING *",
            [pas_nombre, id]
        );

        if (result.rows.length === 0)
            return res.status(404).json({
                message: "reino no encontrado",
            });

        return res.json(result.rows[0]);
    } catch (error) {
        next(error)
    }


}


module.exports = {
    getAllFilo,
    getFiloByReino,
    getFilo,
    createFilo,
    deleteFilo,
    updateFilo
}