export interface IProduct {
    id: number;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    image?: string;
    discount?: number;
    categoryId?: number;
    categoryName?: string;
}
