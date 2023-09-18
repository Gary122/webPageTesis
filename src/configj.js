const {config} = require('dotenv')
config()

module.exports = {
    db: {
        user: process.env.DB_USERJ,
        password: process.env.DB_PASSWORDJ,
        host: process.env.DB_HOSTJ,
        port: process.env.DB_PORTJ,
        database: process.env.DB_DATABASEJ
    }
}