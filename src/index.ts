import { fetchProductCatalog } from "./apiSimulator.js";


console.log("Simulation Starting......");

fetchProductCatalog()
.then((products) => {//resolve sends a value to .then()
    console.log('Products:', products);
})
.catch((err) => console.error('Error:', err))//reject sends an error to .catch()

console.log('Waiting for Products......');