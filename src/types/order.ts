export type PaymentMethod = "cod" | "online";

export type CheckoutOrder = {
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  };
  paymentMethod: PaymentMethod;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  subtotal: number;
  shipping: number;
  total: number;
  createdAt: string;
};
