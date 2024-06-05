export interface Favorite {
    _id: string;
    product: {
      _id: string;
      name: string;
      description: string;
      price: number;
      category: string;
      stock: number;
      images: string[];
      sellerId: string;
    };
  }
  