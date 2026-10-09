import { DataError } from "./errors.js";
import type { Product } from "./apiSimulator.js";


//needs to accepts products with missing fields
//Partial<Product> is the Product type with every field made optional
export function validateProduct(products: Partial<Product>[]): DataError | null {

    products.forEach((product) =>{
        // ?? means "use the right side if the left side is null or undefined"
        if(typeof product.id !== "number"){
            return new DataError("Missing product id: a product id is required")
        }

        if (typeof product.name !== "string" || product.name.trim() === ""){
            return new DataError(`Product with product id of ${product.id} is missing a name`)
        }

    })

    //if nothing is wrong
    return null;

}