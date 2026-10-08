import { fetchProductCatalog } from "./apiSimulator.js";
import { fetchProductReviews } from "./apiSimulator.js";

console.log("Simulation Starting......");

fetchProductCatalog()
.then((products) => {//resolve sends a value to .then()
    console.log('Products:', products);
})
.catch((err) => console.error('Error:', err))//reject sends an error to .catch()

fetchProductReviews(1)
.then((reviews) => {
    console.log('Reviews', reviews);
})
.catch((err) => console.error('Error:', err))


console.log('Waiting for Products......');