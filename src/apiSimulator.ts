

export interface Product {
    id: number;
    name: string;
    price: number;
}

export interface Review {
    productId: number;
    reviewer: string;
    rating: number;
    comment: string;
}


const reviews: Review[] = [
  { productId: 1, reviewer: "Maya R.", rating: 5, comment: "Fast and the battery lasts all day." },
  { productId: 1, reviewer: "Devon K.", rating: 4, comment: "Great screen, but it runs a little warm." },
  { productId: 1, reviewer: "Priya S.", rating: 3, comment: "Good performance, heavier than expected." },
  { productId: 2, reviewer: "Luis M.", rating: 5, comment: "Noise cancelling works really well." },
  { productId: 2, reviewer: "Tara J.", rating: 2, comment: "Ear cushions started peeling after a month." },
]

/* Promise<Product[]> tells TypeScript the function returns a Promise 
    that will eventually hold an array of Product objects
*/
export const fetchProductCatalog = (): Promise<Product[]> => {
  // return a Promise
    return new Promise((resolve, reject) =>{
        //add setTimeout
        setTimeout(() => {
            //set the threshold to 0 and the call always fails
            if (Math.random() < 0.8) {
                //resolve when the roll is under a threshold such as 0.8
                resolve([
                        { id: 1, name: "Laptop", price: 1200 },
                        { id: 2, name: "Headphones", price: 200 },
                        { id: 3, name: "Wireless Mouse", price: 45 },
                    ]);
            } else {
                //reject with "Failed to fetch product catalog" otherwise
                reject("Failed to fetch product catalog");
            }
            }, 1000)
    });
};

//takes a productId number and returns a Promise of a review array
//productId: number means the function expects just the id
export const fetchProductReviews = (productId: number): Promise<Review[]>  => {
    return new Promise((reslove, reject) => {
        setTimeout(() => {
            reslove(reviews.filter(r => r.productId === productId))
        }, 1500)
        
    }
)
}