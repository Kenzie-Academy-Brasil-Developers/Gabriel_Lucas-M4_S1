import { Request, Response, json } from "express"
import { market } from "./database";
import { Products } from "./interfaces";


export const createProduct = (req: Request, res: Response): Response => {
   
    const {name, calories, weight, price, section} = req.body;

const today = new Date();
const expirationDate = new Date(today);
expirationDate.setDate(today.getDate() + 365);
   
    const newProducts: Products = {
        name,
        calories,
        weight,
        section,
        price,
        id: market.length + 1,
        expirationDate,
    }

    market.push(newProducts)
    return res.status(201).json(newProducts)
}

export const listenProducts = (req: Request, res: Response): Response => {
    const total = market.reduce((acc, item) => acc + item.price, 0)
   
    return res.status(200).json({ total: total, products: market})
}

export const getProductById = (req: Request, res: Response): Response  =>{
    return res.status(200).json(res.locals.foundProducts)  
}

export const Delete =  (req: Request, res: Response): Response => {
    const {id} = req.params; 
    const productsIndex: number = market.findIndex(
        (v: Products): boolean =>  v.id === parseInt(id)
    )
    if(productsIndex === -1){
        return res.status(404).json({message: "Product not found."})
    }
    market.splice(productsIndex, 1)
    return  res.status(204).end()
}

export const updateProduct =  (req: Request, res: Response): Response => {
    const { productsIndex } = res.locals
    const updating = (market[productsIndex] = {
        ...market[productsIndex],
        ...req.body,
    })
    return  res.status(200).json(updating)
}
