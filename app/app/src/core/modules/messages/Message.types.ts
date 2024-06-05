export interface Message {
    _id: string;
    sender: {
      _id: string;
      name: string;
      email: string;
      role: string;
    };
    receiver: {
      _id: string;
      name: string;
      email: string;
      role: string;
    };
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
    content: string;
    read: boolean;
    createdAt: Date;
  }
  