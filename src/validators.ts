import { DataError } from "./errors.js";
import type { Product, Review, SalesReport } from "./types.js";


//needs to accepts products with missing fields
//Partial<Product> is the Product type with every field made optional
//returns a DataError for the FIRST bad review, or null if all are valid.
export function validateProduct(products: Partial<Product>[]): DataError | null {

     for (const product of products) {
        // ?? means "use the right side if the left side is null or undefined"
        if(typeof product.id !== "number"){
            return new DataError("Missing product id: a product id is required")
        }

        if (typeof product.name !== "string" || product.name.trim() === ""){
            return new DataError(`Product with product id of ${product.id} is missing a name`)
        }

        if (typeof product.price !== "number"){
            return new DataError(`Product with product id of ${product.id} is missing a price`)
        }

    }

    //if nothing is wrong
    return null;

}



export function validateReviews(reviews: Partial<Review>[]): DataError | null {

    for (const review of reviews){

    }




}

export function validateSalesReport(salesReport: Partial<SalesReport>[]): DataError | null {

    for (const report of salesReport){

    }


}