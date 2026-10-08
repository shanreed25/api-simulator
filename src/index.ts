import { 
    fetchProductCatalog, 
    fetchProductReviews, 
    fetchSalesReport 
} from "./apiSimulator.js";

import type { Product, Review } from "./apiSimulator.js";

console.log("Simulation Starting......");



function loadData(){
    console.log('Waiting for Products......');

    fetchProductCatalog()
    .then((products) => {
        products.forEach((product) => {
            console.log(`Product: ${product.name} $ ${product.price.toFixed(2)}`);
        })
        return products;
    })
    .catch((err): Product[] => {
        console.error("Could not load products:", err);
        return [];//if it fails the chain continues with no products
    })
    /*
    Since the above can return either a plain value or a Promise
    If it's a plain value, the next step receives it immediately
    If it's a Promise, the chain waits for it and passes along the resolved value
    So, the next .then() receives a plain Review[], never a Promise
    */
    .then((products): Promise<Review[]> | Review[] => {
        if (!products[0]){
            return [];//will be a empty Review[] 
         }
         return fetchProductReviews(products[0].id);//will be a Review[] with values
    })
}


// function loadData(){
//     console.log('Waiting for Products......');

//     fetchProductCatalog()
//     .then((products) => {

//         if (!products[0]){
//             throw new Error("No products")
//         }

//         products.forEach((product) => {
//             console.log(`Product: ${product.name} $ ${product.price.toFixed(2)}`);
//         })
        
//         console.log('Waiting for Reviews......');
//         return fetchProductReviews(products[0].id)
//     })
//     .then((reviews) => {
//         console.log('Reviews', reviews);
//         console.log('Waiting for Sales Report......');
//         return fetchSalesReport();
//     })
//     .then((salesReport) => {
//         console.log(salesReport);
//     })
//     /*
//     one catch at the end here means any failure skips every step after it
//     */
//     .catch((err) => {
//         console.error('Error:', err);
//     })
// }

loadData();