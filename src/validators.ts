import { DataError } from "./errors.js";
import type { Product, Review, SalesReport } from "./types.js";


//needs to accepts products with missing fields
//Partial<Product> is the Product type with every field made optional.
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
         if(typeof review.rating!== "number"){
            return new DataError("Review is missing a rating")
        }

        if (review.rating < 1 || review.rating > 5) {
            return new DataError(`Review has a rating of ${review.rating}, but rating must be 1 to 5`);
        }
    }
    return null;
}

export function validateSalesReport(report: Partial<SalesReport>): DataError | null {
        if(typeof report.totalSales !== "number"){
            return new DataError("Sales report is missing total sales")
        }

        if (typeof report.unitsSold !== "number"){
            return new DataError("Sales report is missing units sold")
        }

        if (typeof report.averagePrice !== "number"){
            return new DataError("Sales report is missing average price")
        }

    return null;

}