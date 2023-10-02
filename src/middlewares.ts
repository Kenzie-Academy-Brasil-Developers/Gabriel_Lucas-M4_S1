import { NextFunction, Request, Response } from "express"
import { market } from "./database";
import { Products } from "./interfaces";

export const checkId = (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params; 
    const productsIndex: number = market.findIndex(
        (v: Products): boolean =>  v.id === Number(id)
    )
    if(productsIndex === -1){
        return res.status(404).json({message: "Product not found."})
    }
    const foundProducts = market[productsIndex]
    res.locals = { ...res.locals, productsIndex, foundProducts}
    return next()
}

export const checkName = (req: Request, res: Response, next: NextFunction): void | Response => {
    const {name} = req.body
    if(!name)
    return next()
    const foundProducts: Products | undefined = market.find((
        (p: Products): boolean => p.name === name
    ))
    if(foundProducts){
        return res.status(409).json({message: "Product already registered."})
    }
    return next()
}
