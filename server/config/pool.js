import pg from 'pg';
const { Pool } = pg;

console.log('in the pool');

const pool = new Pool({
    user: "bgustavo81",
    host: "dpg-cfgldd02i3mg6pdvi950-a.ohio-postgres.render.com",
    database: "app_database_dgmg",
    password: "bjUdCcPFjUGpXSaV9a9x9MhUvSP4c1qE",
    port: 5432,
    ssl: true
});


pool.connect()
    .then(() => console.log("Connected successfully"))
    .catch((e) => console.log())


export default pool;