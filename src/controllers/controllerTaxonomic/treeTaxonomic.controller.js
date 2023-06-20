const pool = require("../../db");


const getTreeTaxos = async (req, res, next) => {
    try {
        // Seleccionar todos los reinos
        const { rows: reinos } = await pool.query('SELECT * FROM reino');

        // Para cada reino, seleccionar todos los filos
        for (const reino of reinos) {
            const { rows: filos } = await pool.query('SELECT * FROM filo WHERE rei_id = $1', [reino.rei_id]);
            reino.filos = filos;

            // Para cada filo, seleccionar todas las clases
            for (const filo of reino.filos) {
                const { rows: clases } = await pool.query('SELECT * FROM clase WHERE fil_id = $1', [filo.fil_id]);
                filo.clases = clases;

                // Para cada clase, seleccionar todas los ordenes
                for (const clase of filo.clases) {
                    const { rows: ordenes } = await pool.query('SELECT * FROM orden WHERE cla_id = $1', [clase.cla_id]);
                    clase.ordenes = ordenes;

                    // Para cada orden, seleccionar todas las familias
                    for (const orden of clase.ordenes) {
                        const { rows: familias } = await pool.query('SELECT * FROM familia WHERE ord_id = $1', [orden.ord_id]);
                        orden.familias = familias;

                        // Para cada familia, seleccionar todos los generos
                        for (const familia of orden.familias) {
                            const { rows: generos } = await pool.query('SELECT * FROM genero WHERE fam_id = $1', [familia.fam_id]);
                            familia.generos = generos;

                            // Para cada genero, seleccionar todas las especies
                            for (const genero of familia.generos) {
                                const { rows: especies } = await pool.query('SELECT * FROM especie WHERE gen_id = $1', [genero.gen_id]);
                                genero.especies = especies;
                            }
                        }
                    }
                }
            }
        }

        res.json(reinos);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener datos de la base de datos');
    }
};

module.exports ={
    getTreeTaxos
}