import pg from "pg"
import "dotenv/config"
const { Pool } = pg

// cambia los datos de acuerdo a tu configuracion de postgres
export const pool = new Pool({
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.NAME_DB,
    allowExitOnIdle: true,
});
/*
try {
    await pool.query("SELECT NOW()")
    console.log("Database connected")
} catch (error) {
    console.log(error)
}*/