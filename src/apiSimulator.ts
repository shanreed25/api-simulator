



export interface Product {
    id: number;
    name: string;
    price: number;
}


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
                ]);
            } else {
                //reject with "Failed to fetch product catalog" otherwise
                reject("Failed to fetch product catalog");
            }
            }, 1000)
    });
};