import {
  fetchProductCatalog,
  fetchProductReviews,
  fetchSalesReport,
} from "./apiSimulator.js";

import type { Product, Review } from "./apiSimulator.js";

console.log("Simulation Starting......");

function loadData() {
  console.log("Waiting for Products......");

  fetchProductCatalog() //display products
    .then((products) => {
      products.forEach((product) => {
        console.log(`Product: ${product.name} $ ${product.price.toFixed(2)}`);
      });
      return products;
    })
    .catch((err): Product[] => {
      //log error and continue with no products
      console.error("Could not load products:", err);
      return []; //if it fails the chain continues with no products
    })
    .then((products) => {//=============================this give me a products array
      //get reviews for every product and display them
      console.log("Waiting for Reviews......");
      //I have 6 reviews so reviewPromises holds 5 pending Promises and I need to wait for them all and Promise.all waits and collects the results
      const reviewPromises = products.map((product) =>
        fetchProductReviews(product.id),
      );
      //console.log(reviewPromises);//[ Promise { <pending> }, Promise { <pending> }, Promise { <pending> } ]

      //Promise.all waits for all six Promises to resolve
      //then puts each one’s result into a new array(reviewList) in 
      // the same position as its Promise
      return Promise.all(reviewPromises).then((reviewsList) => {
        //reviewsList is a list of arrays, where each array contains all the reviews for a give product
        // like [[{productId: 1,reviewer: 'Maya R.'.....}], [{productId: 2, reviewer: 'Tara J.'.....}], [{productId: 3, reviewer: 'Shannon R.'.....}]],
        products.forEach((product, index) => {
          const reviews = reviewsList[index] ?? [];
          // log product.name
          console.log(`Reviews for ${product.name}:`);

          //then the reviews or "No reviews yet"
          if (reviews.length === 0) {
            console.log("  No reviews yet");
          }
          reviews.forEach((review) => {
            console.log(`   ${review.rating}/5 ${review.reviewer}: ${review.comment}`,);
          });
        });
      });
    });
}


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
