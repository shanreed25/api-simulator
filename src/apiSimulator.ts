

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

export interface SalesReport {
    totalSales: number;
    unitsSold: number;
    averagePrice: number;
}

const products: Product[] = [
    { id: 1, name: "Laptop", price: 1200 },
    { id: 2, name: "Headphones", price: 200 },
    { id: 3, name: "Wireless Mouse", price: 45 },                   
]

const reviews: Review[] = [
  { productId: 1, reviewer: "Maya R.", rating: 5, comment: "Fast and the battery lasts all day." },
  { productId: 2, reviewer: "Tara J.", rating: 2, comment: "Ear cushions started peeling after a month." },
  { productId: 3, reviewer: "Shannon R.", rating: 2, comment: "Feels really nice." },
  { productId: 1, reviewer: "Priya S.", rating: 3, comment: "Good performance, heavier than expected." },
  { productId: 2, reviewer: "Luis M.", rating: 5, comment: "Noise cancelling works really well." },
  { productId: 3, reviewer: "Devon K.", rating: 4, comment: "Great scroll and easy movement." },
  
]

const salesReport: SalesReport = {
    totalSales: 50700,
    unitsSold: 150,
    averagePrice: 338,//total sales divided by units sold: 50,700 ÷ 150 = 338
}

export const fetchProductCatalog = (): Promise<Product[]> => {//fetchProductCatalog returns a Promise of products
  // return a Promise
    return new Promise((resolve, reject) =>{
        //add setTimeout
        setTimeout(() => {
            //set the threshold to 0 and the call always fails
            // if (Math.random() < 0.8) {
            if(true === true){//always resloves
                //resolve when the roll is under a threshold such as 0.8
                resolve(products);
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
            //code to force failure for testing
            // if(productId === 2){
            //     reject(`Failed to fetch reviews for product with ID: ${productId}`)
            // }

            // if (Math.random() < 0.8) {
            if(true === true){//always resloves
                reslove(reviews.filter(r => r.productId === productId))
            } else {
                reject(`Failed to fetch reviews for product with ID: ${productId}`)
            }
        }, 1500)
        
    }
)
}

export const fetchSalesReport = (): Promise<SalesReport>  => {
    return new Promise((reslove, reject) => {
        setTimeout(() => {
            // if (Math.random() < 0.8) {
            if(true === true){//always resloves
                reslove(salesReport)
            } else {
                reject("Failed to fetch sales report")
            }
        }, 1000)
        
    }
)
}