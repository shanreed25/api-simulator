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
      console.error("Could not load products:", err);
      return []; //if it fails the chain continues with no products
    })
    .then((products) => {
      console.log("Waiting for Reviews......");
      //I have 6 reviews so reviewPromises holds 5 pending Promises and I need to wait for them all and Promise.all waits and collects the results
      const reviewPromises = products.map((product) =>
        fetchProductReviews(product.id),
      );
      return Promise.allSettled(reviewPromises).then((results) => {
        //results is an array wherw each slot holds a result object describing what happened
        products.forEach((product, i) => {
          const result = results[i];//gets product’s result object
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
      })

      .then(() => {
         console.log("Waiting for the Sales Report......");
         return fetchSalesReport()
         .then((salesReport) => {
            console.log("Sales Report:");
            console.log(` Total Sales: $${salesReport.totalSales.toFixed(2)}`);
            console.log(` Units Sold: ${salesReport.unitsSold}`);
            console.log(` Average price: $${salesReport.averagePrice.toFixed(2)}`);
         })
         .catch((err) => {
            console.error("Could not load sales report:", err);
         })
      })
      //catches anything not handled
      .catch((err) => {
        console.error("Error", err);
      })
    })
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
