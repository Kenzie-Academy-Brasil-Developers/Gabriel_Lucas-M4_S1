import { Request, Response } from "express"
import { productsDatabase } from "./database"

export const createProduct = (req: Request, res: Response) => {
    const productId = productsDatabase.length + 1
    const newProduct = { id: productId,
        name: req.body.name,
        price: req.body.price,
        weight: req.body.weight,
        section: req.body.section,
        calories: req.body.calories,
        expirationDate: 365 }

    productsDatabase.push(newProduct)

    return res.status(201).json({ message: "Product sucessfully created!", product: newProduct })
}

export const getAllProducts = (req: Request, res: Response) => {
    const total = productsDatabase.reduce((acc, cur) => acc + cur.price, 0)
    return res.status(200).json( {total: total, products: productsDatabase} )
}

export const getProduct = (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const product = productsDatabase.find(p => p.id === id)
    if (product?.id) {
        return res.status(200).json( {product: product} )
    } else {
        return res.status(404).json( { message: "Produto não encontrado" } )
    }

}

export const changeProduct = (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const index = productsDatabase.findIndex(p => p.id === id)
    
    if (index !== -1) {
        productsDatabase[index] = { id: productsDatabase[index].id,
            name: req.body.name,
            price: req.body.price,
            weight: req.body.weight,
            section: productsDatabase[index].section,
            calories: req.body.calories,
            expirationDate: productsDatabase[index].expirationDate }
    
        return res.status(200).json(productsDatabase)
    } else {
        return res.status(404).json( { message: "Produto não encontrado" } )
    }
}

export const deleteProduct = (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const index = productsDatabase.findIndex(p => p.id === id)
    console.log(index);
    

    if (index !== -1) {
        console.log(productsDatabase[index])
        productsDatabase.splice(index, 1)
        return res.status(204).json("NO CONTENT")
    } else {
        return res.status(404).json( { message: "Produto não encontrado" } )
    }
}