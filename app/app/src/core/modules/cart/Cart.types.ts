export interface CartItem {
    productId: {
      _id: string;
      name: string;
      description: string;
      price: number;
      category: string;
      stock: number;
      images: string[];
      sellerId: string;
    };
    quantity: number;
  }
  
  export interface Cart {
    _id: string;
    userId: string;
    items: CartItem[];
  }
  