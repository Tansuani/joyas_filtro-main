import { controllerJoyas } from "../controllers/controllerjoyas.js"
import { Router } from "express"

const routerJoyas = Router()


routerJoyas.get("/", controllerJoyas.todas)
routerJoyas.get("/filtros", controllerJoyas.filtradas)
routerJoyas.get("*", (req, res) => {
    res.status(404).send("Esta ruta no existe")
})

export default routerJoyas