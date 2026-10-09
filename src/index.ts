import {
  fetchProductCatalog,
  fetchProductReviews,
  fetchSalesReport,
} from "./apiSimulator.js";

import type { Product} from "./types.js";


console.log("Simulation Starting......");

function loadData() {
  console.log("Waiting for Products......");

  fetchProductCatalog()

    // display products
    .then((products) => {
      products.forEach((product) => {
        console.log(`Product: ${product.name} $${product.price.toFixed(2)}`);
      });
      return products;
    })

    .catch((err): Product[] => {
      console.error("Could not load products:", err);
      return []; // if it fails the chain continues with no products
    })

    // reviews for every product
    .then((products) => {
      console.log("Waiting for Reviews......");

      // one pending Promise per product, all running at once
      const reviewPromises = products.map((product) =>
        fetchProductReviews(product.id),
      );

      // allSettled waits for every Promise, success or failure
      return Promise.allSettled(reviewPromises).then((results) => {
        // results lines up with products by index
        products.forEach((product, i) => {
          const result = results[i]; // this product's result object
          console.log(`Reviews for ${product.name}:`);

          if (!result) { // satisfies "result is possibly undefined"
            return;
          }

          // narrowing: after this check, result must be the fulfilled kind
          if (result.status === "rejected") {
            console.error("  Could not load reviews:", result.reason);
            return;
          }

          const reviews = result.value;
          if (reviews.length === 0) {
            console.log("  No reviews yet");
          }
          reviews.forEach((review) => {
            console.log(`  ${review.rating}/5 ${review.reviewer}: ${review.comment}`);
          });
        });
      });
    }) 

    // sales report
    .then(() => {
      console.log("Waiting for the Sales Report......");
      return fetchSalesReport()
        .then((salesReport) => {
          console.log("Sales Report:");
          console.log(`  Total Sales: $${salesReport.totalSales.toFixed(2)}`);
          console.log(`  Units Sold: ${salesReport.unitsSold}`);
          console.log(`  Average price: $${salesReport.averagePrice.toFixed(2)}`);
        })
        // only catches sales report errors
        .catch((err) => {
          console.error("Could not load sales report:", err);
        });
    })

    //final catch
    .catch((err) => {
      console.error("Error:", err);
    })

    //finally
    .finally(() => {
      console.log("All API calls have been attempted");
    });
}

loadData();