const express = require('express');
const morgan = require('morgan');
const cors =require("cors");

const countryRoutes = require('./routes/routesMundo/countries.routes')
const stateRoutes = require('./routes/routesMundo/states.routes')


const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(countryRoutes);
app.use(stateRoutes);

app.use((err, req, res, next)=>{
    return res.json({
        message: err.message
    }) 

})

app.listen(4000)
console.log('Server on porrt 4000')