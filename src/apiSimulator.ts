



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
    return new Promise((resolve) =>{
        //add setTimeout
        setTimeout(() => {
            resolve([//resolve with a mock array of products
            { id: 1, name: "Laptop", price: 1200 },
            { id: 2, name: "Headphones", price: 200 },
        ]);
        }, 1000)
    });
};