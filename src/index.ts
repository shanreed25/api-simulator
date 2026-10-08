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
    .then((products) => {
      //=============================this give me a products array
      //get reviews for every product and display them
      console.log("Waiting for Reviews......");
      //I have 6 reviews so reviewPromises holds 5 pending Promises and I need to wait for them all and Promise.all waits and collects the results
      const reviewPromises = products.map((product) =>
        fetchProductReviews(product.id),
      );
      //console.log(reviewPromises);//[ Promise { <pending> }, Promise { <pending> }, Promise { <pending> } ]

      //with Promise.all one failure lost all six reviews
      //Promise.allSettled Instead of rejecting when one call fails,
      // it waits for every Promise to finish and tells you how each one turned out
      //returns an array where each iem holds a result object describing what happened instead
      return Promise.allSettled(reviewPromises).then((results) => {
        //reviewsList is a list of arrays, where each array contains all the reviews for a give product
        // like [[{productId: 1,reviewer: 'Maya R.'.....}], [{productId: 2, reviewer: 'Tara J.'.....}], [{productId: 3, reviewer: 'Shannon R.'.....}]],
        products.forEach((product, i) => {
          const result = results[i];//gets product’s result object
          // log product.name
          console.log(`Reviews for ${product.name}:`);

          if (!result) {//without this there is a warning saying 'result' is possibly 'undefined'
            return;
          }

          //status is either "fulfilled" or "rejected"
          //use narrowing to check if status is rejected it knows result must be the fulfilled kind
          if (result.status === "rejected") {
            console.error("Could not load reviews: ", result.reason);//reason holds whatever was passed to reject
            return;
          }


          //if the code makes it here then it knows result must be the fulfilled
          //so I can use result.value
          const reviews = result.value;
          if (reviews.length === 0) {
            console.log("  No reviews yet");
          }
          reviews.forEach((review) => {
            console.log(
              `   ${review.rating}/5 ${review.reviewer}: ${review.comment}`,
            );
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
