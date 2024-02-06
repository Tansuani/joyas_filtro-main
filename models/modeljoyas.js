import "dotenv/config";
import format from "pg-format";
import { pool } from "../database/connection.js";

// Creamos una constante con la URL de la aplicación según el entorno
// DOMAIN_URL_APP deberías crearla al momento de desplegar la aplicación
// PORT se debe agregar al archivo .env
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.DOMAIN_URL_APP
    : `http://localhost::${process.env.PORT}`

const findAll = async ({ limits = 5, order_by = "nombre_ASC", page = 1 }) => {
  const countQuery = "SELECT COUNT(*) FROM inventario"
  const { rows: countResult } = await pool.query(countQuery)
  const total_rows = parseInt(countResult[0].count, 10)

  // Calcula el número total de páginas
  const total_pages = Math.ceil(total_rows / limits)

  const query = "SELECT id, nombre, stock FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s"
  const offset = (page - 1) * limits
  const [campo, direccion] = order_by.split("_")
  const formattedQuery = format(query, campo, direccion, limits, offset)
  const { rows } = await pool.query(formattedQuery)

  const results = rows.map((row) => {
    return {
      name: row.nombre,
      href: `${BASE_URL}/joyas/joya/${row.id}`,
    }
  })

  const stock_total = rows.map((row) => {
    return row.stock
  }).reduce((a, b) => a + b, 0)

  return {
    totalJoyas: rows.length,
    stockTotal: stock_total,
    results,
  }
}

const findCampos = async ({ precio_max, precio_min, categoria, metal }) => {

  let filtros = []
  const values = []

  const agregarFiltro = (campo, comparador, valor) => {
    values.push(valor)
    const { length } = filtros
    filtros.push(`${campo} ${comparador} $${length + 1}`)
  }


  if (precio_max) agregarFiltro('precio', '<=', precio_max)
  if (precio_min) agregarFiltro('precio', '>=', precio_min)
  if (categoria) agregarFiltro('categoria', '=', categoria)
  if (metal) agregarFiltro('metal', '=', metal)

  let query = "SELECT id, nombre, categoria, metal, precio, stock FROM inventario"
  if (filtros.length > 0) {
    filtros = filtros.join(" AND ")
    query += ` WHERE ${filtros}`
  }

  const { rows } = await pool.query(query,values)
  return rows
}




export const modelJoyas = {
  findAll,
  findCampos
}