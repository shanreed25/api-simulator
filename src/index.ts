import { fetchProductCatalog } from "./apiSimulator.js";
import { fetchProductReviews } from "./apiSimulator.js";
import { fetchSalesReport } from "./apiSimulator.js";

console.log("Simulation Starting......");



console.log('Waiting for Products......');

function loadData(){
    fetchProductCatalog()
    .then((products) => {

        if (!products[0]){//check before using it
            throw new Error("No products")//throwing inside a .then() sends the error to .catch()
        }

        products.forEach((product) => {
            console.log(`Product: ${product.name} $ ${product.price.toFixed(2)}`);
        })
        
        console.log('Waiting for Reviews......');
        return fetchProductReviews(products[0].id)
        /*
        //non-null assertion !: tells TypeScript "trust me, this isn't undefined"
        //error disappears, but you lose the safety: an empty array would still 
        // crash at runtime. Fine for a quick test, risky as a habit.
        return fetchProductReviews(products[0]!.id)
        // return fetchProductReviews(1);
        */
    })
    .then((reviews) => {
        console.log('Reviews', reviews);
        console.log('Waiting for Sales Report......');
        return fetchSalesReport();
    })
    .then((salesReport) => {
        console.log(salesReport);
    })
    .catch((err) => {
        console.error('Error:', err);
    })
}

loadData();