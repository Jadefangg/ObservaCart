import axios from 'axios';
import { trace, context } from '@opentelemetry/api';

// Get the tracer
const tracer = trace.getTracer('observacart-frontend', '1.0.0');

// API Base URLs - these should match your backend services
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
const PRODUCT_SERVICE_URL = process.env.REACT_APP_PRODUCT_SERVICE_URL || 'http://localhost:5001';
const USER_SERVICE_URL = process.env.REACT_APP_USER_SERVICE_URL || 'http://localhost:5002';
const ORDER_SERVICE_URL = process.env.REACT_APP_ORDER_SERVICE_URL || 'http://localhost:5003';

// Create axios instances for each service
const productApi = axios.create({
  baseURL: PRODUCT_SERVICE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const userApi = axios.create({
  baseURL: USER_SERVICE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const orderApi = axios.create({
  baseURL: ORDER_SERVICE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptors to include auth tokens
const addAuthInterceptor = (apiInstance) => {
  apiInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

// Add auth interceptors to all APIs
addAuthInterceptor(userApi);
addAuthInterceptor(orderApi);

// Product Service API
export const productService = {
  // Get all products
  getAllProducts: async () => {
    return tracer.startActiveSpan('products.getAllProducts', async (span) => {
      try {
        span.setAttributes({
          'service.name': 'observacart-frontend',
          'operation.name': 'get-all-products',
          'user.action': 'browse-products'
        });

        // For demo purposes, return mock data if backend is not available
      const mockProducts = [
        {
          id: 1,
          name: "Premium Wireless Headphones",
          description: "High-quality wireless headphones with noise cancellation and premium sound quality.",
          price: 299.99,
          category: "Electronics",
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=240&fit=crop",
          stock: 25
        },
        {
          id: 2,
          name: "Smart Fitness Watch",
          description: "Advanced fitness tracking with heart rate monitor, GPS, and smartphone connectivity.",
          price: 199.99,
          category: "Electronics",
          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=240&fit=crop",
          stock: 15
        },
        {
          id: 3,
          name: "Ergonomic Office Chair",
          description: "Comfortable ergonomic office chair with lumbar support and adjustable height.",
          price: 449.99,
          category: "Furniture",
          image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=240&fit=crop",
          stock: 8
        },
        {
          id: 4,
          name: "Organic Coffee Beans",
          description: "Premium organic coffee beans sourced from sustainable farms. Rich, bold flavor.",
          price: 24.99,
          category: "Food & Beverages",
          image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=240&fit=crop",
          stock: 50
        },
        {
          id: 5,
          name: "Minimalist Desk Lamp",
          description: "Modern LED desk lamp with adjustable brightness and sleek minimalist design.",
          price: 89.99,
          category: "Home & Garden",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=240&fit=crop",
          stock: 12
        },
        {
          id: 6,
          name: "Wireless Charging Pad",
          description: "Fast wireless charging pad compatible with all Qi-enabled devices.",
          price: 39.99,
          category: "Electronics",
          image: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=400&h=240&fit=crop",
          stock: 30
        },
        {
          id: 7,
          name: "Yoga Mat Pro",
          description: "Professional-grade yoga mat with superior grip and cushioning for all yoga styles.",
          price: 79.99,
          category: "Sports & Fitness",
          image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=240&fit=crop",
          stock: 20
        },
        {
          id: 8,
          name: "Stainless Steel Water Bottle",
          description: "Insulated stainless steel water bottle that keeps drinks cold for 24h or hot for 12h.",
          price: 34.99,
          category: "Sports & Fitness",
          image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=240&fit=crop",
          stock: 45
        },
        {
          id: 9,
          name: "Bluetooth Speaker",
          description: "Portable Bluetooth speaker with 360-degree sound and waterproof design.",
          price: 129.99,
          category: "Electronics",
          image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=240&fit=crop",
          stock: 18
        }
        ];

        try {
          const response = await productApi.get('/products');
          span.setAttributes({
            'http.status_code': response.status,
            'products.count': response.data?.length || 0,
            'data.source': 'backend'
          });
          span.setStatus({ code: 1 }); // SUCCESS
          return response.data;
        } catch (error) {
          // If backend is not available, return mock data
          console.log('Backend not available, using mock data');
          span.setAttributes({
            'data.source': 'mock',
            'products.count': mockProducts.length,
            'fallback.reason': 'backend_unavailable'
          });
          span.setStatus({ code: 1 }); // SUCCESS (fallback worked)
          return { data: mockProducts };
        }
      } catch (error) {
        span.recordException(error);
        span.setStatus({ code: 2, message: error.message }); // ERROR
        console.error('Error fetching products:', error);
        throw error;
      } finally {
        span.end();
      }
    });
  },  // Get product by ID
  getProductById: async (productId) => {
    try {
      const response = await productApi.get(`/products/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  // Search products
  searchProducts: async (query) => {
    try {
      const response = await productApi.get(`/products/search?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  },
};

// User Service API
export const userService = {
  // Register new user
  register: async (userData) => {
    try {
      const response = await userApi.post('/users/register', userData);
      return response.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await userApi.post('/users/login', credentials);
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Get user profile
  getProfile: async () => {
    try {
      const response = await userApi.get('/users/profile');
      return response.data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  },
};

// Order Service API
export const orderService = {
  // Create new order
  createOrder: async (orderData) => {
    try {
      const response = await orderApi.post('/orders', orderData);
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  // Get user orders
  getUserOrders: async () => {
    try {
      const response = await orderApi.get('/orders');
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },

  // Get order by ID
  getOrderById: async (orderId) => {
    try {
      const response = await orderApi.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  },

  // Update order status
  updateOrderStatus: async (orderId, status) => {
    try {
      const response = await orderApi.put(`/orders/${orderId}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  },
};

export default {
  productService,
  userService,
  orderService,
};
