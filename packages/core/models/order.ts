import type { Product } from "./product";

export interface Order {
    id: string | null;
    eta: string | null;
    orderValue: number | null;
    items: Product[];
    timestamp: string | null;
}