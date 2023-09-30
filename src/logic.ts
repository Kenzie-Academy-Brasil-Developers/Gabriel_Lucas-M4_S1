import { Request, Response } from "express"
import { market } from "./database"

export const createProduct = (req: Request, res: Response) => {
    const findProduct = market.find(product => product.name === req.body.name);
    let lastId = market[market.length-1]
    console.log(lastId);
    let newId = 1
    if(lastId !== undefined){
        newId = lastId.id + 1
    }

    if (findProduct) {
        return res.status(409).json({ message: "Product already registered." });
    }

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 365);
    const newProduct = {
        id: newId,
        name: req.body.name,
        price: req.body.price,
        weight: req.body.weight,
        calories: req.body.calories,
        section: req.body.section,
        expirationDate: expirationDate
    };

    market.push(newProduct);

    return res.status(201).json(newProduct);
}


export const getAllProducts = (req: Request, res: Response) => {
    const total = market.reduce((acc, cur) => acc + cur.price, 0)
    return res.status(200).json( {total: total, products: market} )
}

export const getProduct = (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const product = market.find(p => p.id === id)
    if (product?.id) {
        return res.status(200).json(product)
    } else {
        return res.status(404).json( { message: "Product not found." } )
    }

}

export const changeProduct = (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const index = market.findIndex(p => p.id === id)
    
    
    if (index !== -1) {
        const findProduct = market.find(product => product.name === req.body.name);
        if (findProduct) {
            return res.status(409).json({ message: "Product already registered." });
        }
        market[index] = { id: market[index].id,
            name: req.body.name ? req.body.name:market[index].name,
            price: req.body.price ? req.body.price:market[index].price,
            weight: req.body.weight ? req.body.weight:market[index].weight,
            section: market[index].section,
            calories: req.body.calories ? req.body.calories:market[index].calories,
            expirationDate: market[index].expirationDate }
    
        return res.status(200).json(market[index])
    } else {
        return res.status(404).json( { message: "Product not found." } )
    }
}

export const deleteProduct = (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const index = market.findIndex(p => p.id === id)
    console.log(index);
    

    if (index !== -1) {
        console.log(market[index])
        market.splice(index, 1)
        return res.status(204).json("NO CONTENT")
    } else {
        return res.status(404).json( { message: "Product not found." } )
    }
}