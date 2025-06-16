
// WooCommerce API configuration and helper functions
const WC_BASE_URL = 'https://elliaa-f7a8crfnbmczgea2.italynorth-01.azurewebsites.net'; // رابط موقع ووردبرس الخاص بك
const CONSUMER_KEY = 'ck_3cf68e0188d4b3230a0995a1345819fff687e0fe';
const CONSUMER_SECRET = 'cs_25ecda98dd8c4d05e6618196b7bc54a7a46258d7';

export interface WooProduct {
  id: number;
  name: string;
  description: string;
  short_description: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  status: string;
  featured: boolean;
  categories: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  images: Array<{
    id: number;
    src: string;
    alt: string;
  }>;
  stock_status: string;
  stock_quantity: number;
  rating_count: number;
  average_rating: string;
  attributes: Array<{
    id: number;
    name: string;
    options: string[];
  }>;
}

export interface WooOrder {
  id: number;
  status: string;
  total: string;
  billing: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address_1: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
  };
  shipping: {
    first_name: string;
    last_name: string;
    address_1: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
  };
  line_items: Array<{
    id: number;
    product_id: number;
    name: string;
    quantity: number;
    price: string;
    total: string;
  }>;
  payment_method: string;
  payment_method_title: string;
  date_created: string;
}

class WooCommerceAPI {
  private baseURL: string;
  private auth: string;

  constructor() {
    this.baseURL = `${WC_BASE_URL}/wp-json/wc/v3`;
    this.auth = btoa(`${CONSUMER_KEY}:${CONSUMER_SECRET}`);
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Basic ${this.auth}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`WooCommerce API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Products
  async getProducts(params: {
    per_page?: number;
    page?: number;
    search?: string;
    category?: string;
    featured?: boolean;
    on_sale?: boolean;
    status?: string;
  } = {}): Promise<WooProduct[]> {
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value.toString());
      }
    });

    return this.makeRequest(`/products?${queryParams.toString()}`);
  }

  async getProduct(id: number): Promise<WooProduct> {
    return this.makeRequest(`/products/${id}`);
  }

  async getCategories(): Promise<Array<{ id: number; name: string; slug: string; count: number }>> {
    return this.makeRequest('/products/categories');
  }

  // Orders
  async createOrder(orderData: {
    payment_method: string;
    payment_method_title: string;
    billing: any;
    shipping: any;
    line_items: Array<{
      product_id: number;
      quantity: number;
    }>;
    shipping_lines?: Array<{
      method_id: string;
      method_title: string;
      total: string;
    }>;
  }): Promise<WooOrder> {
    return this.makeRequest('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async getOrder(id: number): Promise<WooOrder> {
    return this.makeRequest(`/orders/${id}`);
  }

  // Customer
  async createCustomer(customerData: {
    email: string;
    first_name: string;
    last_name: string;
    billing: any;
    shipping: any;
  }) {
    return this.makeRequest('/customers', {
      method: 'POST',
      body: JSON.stringify(customerData),
    });
  }
}

export const wooCommerce = new WooCommerceAPI();
