const pg = require('pg');

//setting up connection to database
const config = {
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000 
};

//creating pool with database config
const pool = new pg.Pool(config);

//connect to pool!
pool.on("connect", () => {
    console.log('connected to postgres');
});

//in case of failed connection :(
pool.on("error", (err) => {
    console.log('error connecting to postgres', err);
});

//export to other files
module.exports = pool;