export interface OrderProduct {
  _id: string;
  name: string;
  price?: number; // Make price optional
  sellerName: string;
}

export interface OrderItem {
  productId: {
    _id: string | null;
    name: string;
    price?: number;
  };
  quantity: number;
}

export interface Order {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
  };
  products: OrderItem[];
  total: number;
  status: string;
  createdAt: Date;
}
