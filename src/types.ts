
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