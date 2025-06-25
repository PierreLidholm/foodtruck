import type { ReceiptItem } from "./receptItem";

export type Receipt = {
  id: string;
  items: ReceiptItem[];
  orderValue: number;
  timestamp: string; 
};