import { fetchProductCatalog } from "./apiSimulator.js";


console.log("Simulation Starting......");

fetchProductCatalog()
.then((products) => {
    console.log('Products:', products);
})

console.log('Waiting for Products......');