
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface OrderDetails {
  customerName: string;
  mobileNumber: string;
  items: CartItem[];
  totalAmount: number;
  orderId: string;
  timestamp: string;
}
