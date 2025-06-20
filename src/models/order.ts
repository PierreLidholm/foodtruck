import type { Product } from "./product";

export interface Order {
    id: string | null;
    items: Product[];
    timestamp: string | null;
}