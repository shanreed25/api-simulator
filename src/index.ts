import { 
    fetchProductCatalog, 
    fetchProductReviews, 
    fetchSalesReport 
} from "./apiSimulator.js";

import type { Product, Review } from "./apiSimulator.js";

console.log("Simulation Starting......");



function loadData(){
    console.log('Waiting for Products......');

    fetchProductCatalog()//display products
    .then((products) => {
        products.forEach((product) => {
            console.log(`Product: ${product.name} $ ${product.price.toFixed(2)}`);
        })
        return products;
    })
    .catch((err): Product[] => {//log error and continue with no products
        console.error("Could not load products:", err);
        return [];//if it fails the chain continues with no products
    })
    .then((products) => {//get reviews for every product and display them
        console.log("Waiting for Reviews......");
         //I have 5 reviews so reviewPromises holds 5 pending Promises and I need to wait for them all
         const reviewPromises = products.map((product) => fetchProductReviews(product.id));
         
         return Promise.all(reviewPromises)
                .then((reviews) => {
                    products.forEach((product, index) => {
                        const
                    })
                })
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