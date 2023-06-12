const pool = require("../../db");

const getConsult = async (req, res, next) => {

    const consult =
        "SELECT ESPECIE.ESP_NOMBRE, " +
        "ESPECIE.ESP_SEXO, " +
        "LOC.LOC_PARQUE_NACIONAL, " +
        "LOC.GEOM, " +
        "LOC.LOC_LATITUD, " +
        "LOC.LOC_LONGITUD, " +
        "PRO.PRO_NOMBRE, " +
        "PA.PAS_NOMBRE, " +
        "IDE.IDE_APELLIDO, " +
        "IDE.IDE_ANIO, " +
        "COL.COL_APELLIDO, " +
        "COL.COL_FECHA, " +
        "COL.COL_METODO, " +
        "COL.COL_DESTINO " +
        "FROM ESPECIE " +
        "INNER JOIN LOCALIZACION AS LOC ON ESPECIE.ESP_ID = LOC.ESP_ID " +
        "INNER JOIN LOCALIZACION_PROVINCIA AS LOC_PRO ON LOC.LOC_ID = LOC_PRO.LOC_ID " +
        "INNER JOIN PROVINCIA AS PRO ON LOC_PRO.PRO_ID = PRO.PRO_ID " +
        "INNER JOIN PAIS AS PA ON PRO.PAS_ID = PA.PAS_ID " +
        "INNER JOIN ESPECIE_IDENTIFICADOR AS ESP_IDE ON ESPECIE.ESP_ID = ESP_IDE.ESP_ID " +
        "INNER JOIN IDENTIFICADOR AS IDE ON ESP_IDE.IDE_ID = IDE.IDE_ID " +
        "INNER JOIN ESPECIE_COLECTOR AS ESP_COL ON ESPECIE.ESP_ID = ESP_COL.ESP_ID " +
        "INNER JOIN COLECTOR AS COL ON ESP_COL.COL_ID = COL.COL_ID " +
        "WHERE PRO.PRO_NOMBRE = $1 ";
        


    try {
        const { provincia } = req.params
    
        const result = await pool.query(consult, [provincia]);

        console.log(result)

        if (result.rows.length === 0)
            return res.status(404).json({
                message: "no hay resultados con la provincia asignada"
            });
        //return res.json(result.rows[0]); si pongo [0] me devuelve la primera respuesta
        return res.json(result.rows);

    } catch (error) {
        next(error)
    }

    
};



module.exports = {
    getConsult
}