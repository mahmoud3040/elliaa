// WooCommerce API configuration and helper functions
const WC_BASE_URL = 'https://wp.elliaa.com'; // رابط موقع ووردبرس الجديد
const CONSUMER_KEY = 'ck_7b19208aba5eecf7010f566c02cde93f68f5dec1';
const CONSUMER_SECRET = 'cs_cf1a9c7182e8c08686412af61c7a4edac48225b7';

export interface WooVariation {
  id: number;
  regular_price: string;
  sale_price: string;
  attributes: Array<{
    name: string;
    option: string;
  }>;
  image: {
    src: string;
  };
}

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
  variations: number[];
  type: string;
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

  async getCategories(): Promise<Array<{ 
    id: number; 
    name: string; 
    slug: string; 
    count: number;
    image?: {
      src: string;
    };
  }>> {
    return this.makeRequest('/products/categories?per_page=100&_fields=id,name,slug,count,image');
  }

  async getProductVariations(productId: number): Promise<WooVariation[]> {
    return this.makeRequest(`/products/${productId}/variations`);
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

  // Payment Gateways
  async getPaymentGateways(): Promise<any[]> {
    return this.makeRequest('/payment_gateways');
  }

  // Shipping Methods
  async getShippingMethods(): Promise<any[]> {
    return this.makeRequest('/shipping_methods');
  }

  // WooCommerce Settings
  async getSettings(): Promise<any[]> {
    return this.makeRequest('/settings');
  }
}

export const wooCommerce = new WooCommerceAPI();

