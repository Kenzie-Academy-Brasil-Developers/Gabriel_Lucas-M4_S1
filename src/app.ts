import express, { Application} from "express"
import { createProduct, Delete, getProductById, listenProducts, updateProduct } from "./logic"
import middlewares, { checkId, checkName } from "./middlewares"

const app: Application = express()

app.use(express.json())

app.get("/products", listenProducts)

app.post("/products", checkName, createProduct)

app.get("/products/:id", checkId, getProductById)

app.delete("/products/:id", checkId, Delete)

app.patch("/products/:id", checkId, checkName, updateProduct)

const PORT: number = 3000
app.listen(PORT, (): void => {
    console.log(`Application is running on port ${PORT}`)
})