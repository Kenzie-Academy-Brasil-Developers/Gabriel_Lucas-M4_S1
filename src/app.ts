import express, { Request, Response } from "express"
import { changeProduct, createProduct, deleteProduct, getAllProducts, getProduct } from "./logic"

const app = express()

app.use(express.json())

app.post("/products", createProduct)
app.get("/products", getAllProducts)
app.get("/products/:id", getProduct)
app.patch("/products/:id", changeProduct)
app.delete("/products/:id", deleteProduct)


const PORT = 3000


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})