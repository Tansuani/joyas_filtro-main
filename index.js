import "dotenv/config"
import express from "express"

import routerJoyas from "./routes/routejoyas.js"

const app = express()

app.use(express.json())
app.use("/joyas", routerJoyas)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})