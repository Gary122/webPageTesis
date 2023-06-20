const express = require('express');
const morgan = require('morgan');
const cors =require("cors");

const consultRoutes = require('./routes/routesQueries/query.routes') //tabla

///Mundo
const countryRoutes = require('./routes/routesMundo/countries.routes') //paises
const stateRoutes = require('./routes/routesMundo/states.routes') //provincias

////Taxonomia
const taxonRoutesReino = require('./routes/routesTaxonomic/reino.routes') //taxon reino
const taxonRoutesOrden = require('./routes/routesTaxonomic/orden.routes') //taxon orden
const taxonRoutesGenero = require('./routes/routesTaxonomic/genero.routes') //taxon genero
const taxonRoutesFilo = require('./routes/routesTaxonomic/filo.routes') //taxon filo
const taxonRoutesFamilia = require('./routes/routesTaxonomic/familia.routes') //taxon familia
const taxonRoutesClase = require('./routes/routesTaxonomic/clase..routes') //taxon clase
const taxonRoutesEspecie = require('./routes/routesTaxonomic/especie.routes') //taxon especie
const taxonTree = require('./routes/routesTaxonomic/treeTaxonomic.routes')


const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(consultRoutes);

///Mundo
app.use(countryRoutes);
app.use(stateRoutes);

////Taxonomia
app.use(taxonRoutesReino);
app.use(taxonRoutesOrden);
app.use(taxonRoutesGenero);
app.use(taxonRoutesFilo);
app.use(taxonRoutesFamilia);
app.use(taxonRoutesClase);
app.use(taxonRoutesEspecie);
app.use(taxonTree);


app.use((err, req, res, next)=>{
    return res.json({
        message: err.message
    }) 

})

app.listen(4000)
console.log('Server on porrt 4000')