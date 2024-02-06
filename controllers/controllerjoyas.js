import { modelJoyas } from "../models/modeljoyas.js";
import { getDatabaseError } from "../lib/errors/database.error.js";

const expresion_regular_numero = /^[1-9]\d*$/
const expresion_regular_orderby = /^(id|nombre|categoria|metal|precio|stock)_(ASC|DESC)$/
const expresion_regular_categorias = /^(collar|aros|anillo)$/
const expresion_regular_metales = /^(oro|plata)$/

const todas = async (req, res) => {
    const { limits = 5, order_by = "nombre_ASC", page = 1 } = req.query


    // Validar el resultado de la expresión regular
    if (!expresion_regular_numero.test(limits))
        return res.status(400).json({ message: "Invalid page limit, number > 0" })

    if (!expresion_regular_orderby.test(order_by))
        return res.status(400).json({ message: "Invalid order string, campo_typo" })

    if (!expresion_regular_numero.test(page))
        return res.status(400).json({ message: "Invalid page number, number > 0" })

    try {
        const todos = await modelJoyas.findAll({ limits, order_by, page })
        return res.json(todos)
    } catch (error) {
        console.log(error)
        if (error.code) {
            const { code, message } = getDatabaseError(error.code)
            return res.status(code).json({ message })
        }
        return res.status(500).json({ message: "Internal server error" })
    }
};

const filtradas = async (req, res) => {
    const { precio_max = null, precio_min = null, categoria = null, metal = null } = req.query

    if (!(precio_max === null) && !expresion_regular_numero.test(precio_max))
        return res.status(400).json({ message: "Invalid precio_max number, number > 0" })

    if (!(precio_min === null) && !expresion_regular_numero.test(precio_min))
        return res.status(400).json({ message: "Invalid precio_min number, number > 0" })

    if (!(categoria === null) && !expresion_regular_categorias.test(categoria))
        return res.status(400).json({ message: "Invalid categoria, string" })

    if (!(metal === null) && !expresion_regular_metales.test(metal))
        return res.status(400).json({ message: "Invalid metal, string" })

    try {
        const todos = await modelJoyas.findCampos({ precio_max, precio_min, categoria, metal })
        return res.json(todos)
    } catch (error) {
        console.log(error)
        if (error.code) {
            const { code, message } = getDatabaseError(error.code)
            return res.status(code).json({ message })
        }
        return res.status(500).json({ message: "Internal server error" })
    }
};



export const controllerJoyas = {
    todas,
    filtradas
}