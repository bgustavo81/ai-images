import pg from 'pg';
const { Pool } = pg;

console.log('in the pool');

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: 5432,
    ssl: true
});


pool.connect()
    .then(() => console.log("Connected successfully"))
    .catch((e) => console.log())


export default pool;