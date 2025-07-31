import { API } from './api.js';
import { AuthManager } from './auth.js';
import { CartManager } from './cart.js';
import { UIManager } from './ui.js';

class TechCartApp {
  constructor() {
    this.api = new API();
    this.auth = new AuthManager(this.api);
    this.cart = new CartManager(this.api);
    this.ui = new UIManager();
    
    this.init();
  }

  async init() {
    try {
      // Initialize authentication
      await this.auth.init();
      
      // Load initial data
      await this.loadCategories();
      await this.loadFeaturedProducts();
      await this.loadDeals();
      
      // Initialize cart if user is logged in
      if (this.auth.isAuthenticated()) {
        await this.cart.loadCart();
      }
      
      // Setup event listeners
      this.setupEventListeners();
      
      console.log('TechCart app initialized successfully');
    } catch (error) {
      console.error('Failed to initialize app:', error);
      this.ui.showNotification('Failed to load application', 'error');
    }
  }

  async loadCategories() {
    try {
      const response = await this.api.get('/categories');
      if (response.success) {
        this.renderCategories(response.data.categories);
        this.renderNavCategories(response.data.categories);
      }
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  }

  async loadFeaturedProducts() {
    try {
      const response = await this.api.get('/products/featured/list?limit=8');
      if (response.success) {
        this.renderProducts(response.data.products, 'featured-products');
      }
    } catch (error) {
      console.error('Failed to load featured products:', error);
    }
  }

  async loadDeals() {
    try {
      const response = await this.api.get('/products/deals/list?limit=8');
      if (response.success) {
        this.renderProducts(response.data.products, 'deals-products');
      }
    } catch (error) {
      console.error('Failed to load deals:', error);
    }
  }

  renderCategories(categories) {
    const container = document.getElementById('categories-grid');
    container.innerHTML = categories.map(category => `
      <a href="#" data-category="${category.slug}" class="category-card flex flex-col items-center p-4 rounded-lg border hover:shadow-md transition">
        <div class="category-icon w-16 h-16 mb-2">
          <img src="${category.icon?.url || 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg'}" 
               alt="${category.icon?.alt || category.name}" 
               class="w-full h-full object-cover rounded">
        </div>
        <span class="text-center font-medium">${category.name}</span>
      </a>
    `).join('');
  }

  renderNavCategories(categories) {
    const container = document.getElementById('nav-categories');
    container.innerHTML = categories.slice(0, 8).map(category => `
      <a href="#" data-category="${category.slug}" class="whitespace-nowrap hover:text-blue-600 font-medium">
        ${category.name}
      </a>
    `).join('');
  }

  renderProducts(products, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = products.map(product => `
      <div class="product-card bg-white rounded-lg overflow-hidden shadow-md transition duration-300">
        <div class="relative">
          ${product.discount > 0 ? `
            <div class="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded absolute top-2 left-2">
              ${product.discount}% OFF
            </div>
          ` : ''}
          <img src="${product.images[0]?.url || 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg'}" 
               alt="${product.images[0]?.alt || product.name}" 
               class="w-full h-48 object-cover">
          <div class="absolute top-2 right-2">
            <button class="wishlist-btn bg-white p-2 rounded-full shadow-md hover:bg-gray-100" data-product-id="${product._id}">
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </button>
          </div>
        </div>
        <div class="p-4">
          <h3 class="font-bold text-lg mb-1">${product.name}</h3>
          <div class="flex items-center mb-2">
            <div class="flex text-yellow-400">
              ${this.renderStars(product.averageRating)}
            </div>
            <span class="text-xs text-gray-600 ml-1">(${product.totalReviews})</span>
          </div>
          <div class="flex items-center">
            <span class="font-bold text-lg">₹${product.price.toLocaleString()}</span>
            ${product.originalPrice ? `
              <span class="text-sm text-gray-500 line-through ml-2">₹${product.originalPrice.toLocaleString()}</span>
              <span class="text-xs text-green-600 ml-2">${product.discount}% off</span>
            ` : ''}
          </div>
          ${product.freeShipping ? '<div class="text-xs text-green-600 mt-1">Free Delivery</div>' : ''}
          <button class="add-to-cart-btn w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition" 
                  data-product-id="${product._id}" 
                  ${product.stock === 0 ? 'disabled' : ''}>
            ${product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    `).join('');
  }

  renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';

    for (let i = 0; i < fullStars; i++) {
      stars += '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>';
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars += '<svg class="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>';
    }

    return stars;
  }

  setupEventListeners() {
    // Auth modal events
    document.getElementById('auth-link').addEventListener('click', (e) => {
      e.preventDefault();
      if (this.auth.isAuthenticated()) {
        this.auth.logout();
      } else {
        document.getElementById('login-modal').classList.remove('hidden');
        document.getElementById('login-modal').classList.add('flex');
      }
    });

    document.getElementById('close-modal').addEventListener('click', () => {
      document.getElementById('login-modal').classList.add('hidden');
      document.getElementById('login-modal').classList.remove('flex');
    });

    document.getElementById('close-register-modal').addEventListener('click', () => {
      document.getElementById('register-modal').classList.add('hidden');
      document.getElementById('register-modal').classList.remove('flex');
    });

    document.getElementById('show-register').addEventListener('click', () => {
      document.getElementById('login-modal').classList.add('hidden');
      document.getElementById('register-modal').classList.remove('hidden');
      document.getElementById('register-modal').classList.add('flex');
    });

    document.getElementById('show-login').addEventListener('click', () => {
      document.getElementById('register-modal').classList.add('hidden');
      document.getElementById('login-modal').classList.remove('hidden');
      document.getElementById('login-modal').classList.add('flex');
    });

    // Auth forms
    document.getElementById('login-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      
      await this.auth.login(email, password);
    });

    document.getElementById('register-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const fullName = document.getElementById('register-name').value;
      const email = document.getElementById('register-email').value;
      const password = document.getElementById('register-password').value;
      const phone = document.getElementById('register-phone').value;
      
      await this.auth.register(fullName, email, password, phone);
    });

    // Search
    document.getElementById('search-btn').addEventListener('click', () => {
      this.performSearch();
    });

    document.getElementById('search-input').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.performSearch();
      }
    });

    // Newsletter
    document.getElementById('newsletter-btn').addEventListener('click', () => {
      const email = document.getElementById('newsletter-email').value;
      if (email) {
        this.ui.showNotification('Thank you for subscribing!', 'success');
        document.getElementById('newsletter-email').value = '';
      }
    });

    // Dynamic event delegation for product actions
    document.addEventListener('click', async (e) => {
      // Add to cart
      if (e.target.classList.contains('add-to-cart-btn') || e.target.closest('.add-to-cart-btn')) {
        const btn = e.target.classList.contains('add-to-cart-btn') ? e.target : e.target.closest('.add-to-cart-btn');
        const productId = btn.dataset.productId;
        
        if (!this.auth.isAuthenticated()) {
          this.ui.showNotification('Please login to add items to cart', 'error');
          document.getElementById('login-modal').classList.remove('hidden');
          document.getElementById('login-modal').classList.add('flex');
          return;
        }
        
        await this.cart.addToCart(productId, 1);
      }

      // Add to wishlist
      if (e.target.classList.contains('wishlist-btn') || e.target.closest('.wishlist-btn')) {
        const btn = e.target.classList.contains('wishlist-btn') ? e.target : e.target.closest('.wishlist-btn');
        const productId = btn.dataset.productId;
        
        if (!this.auth.isAuthenticated()) {
          this.ui.showNotification('Please login to add items to wishlist', 'error');
          document.getElementById('login-modal').classList.remove('hidden');
          document.getElementById('login-modal').classList.add('flex');
          return;
        }
        
        await this.addToWishlist(productId);
      }

      // Category navigation
      if (e.target.dataset.category) {
        e.preventDefault();
        await this.loadCategoryProducts(e.target.dataset.category);
      }
    });
  }

  async performSearch() {
    const query = document.getElementById('search-input').value.trim();
    if (!query) return;

    try {
      const response = await this.api.get(`/products?search=${encodeURIComponent(query)}`);
      if (response.success) {
        // For now, just show notification. In a real app, you'd navigate to search results page
        this.ui.showNotification(`Found ${response.data.products.length} products for "${query}"`, 'success');
      }
    } catch (error) {
      console.error('Search failed:', error);
      this.ui.showNotification('Search failed', 'error');
    }
  }

  async loadCategoryProducts(categorySlug) {
    try {
      const response = await this.api.get(`/products?category=${categorySlug}`);
      if (response.success) {
        // For now, just show notification. In a real app, you'd navigate to category page
        this.ui.showNotification(`Showing products in ${categorySlug}`, 'success');
      }
    } catch (error) {
      console.error('Failed to load category products:', error);
      this.ui.showNotification('Failed to load category products', 'error');
    }
  }

  async addToWishlist(productId) {
    try {
      const response = await this.api.post(`/wishlist/${productId}`);
      if (response.success) {
        this.ui.showNotification('Added to wishlist', 'success');
      }
    } catch (error) {
      console.error('Failed to add to wishlist:', error);
      this.ui.showNotification(error.message || 'Failed to add to wishlist', 'error');
    }
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new TechCartApp();
});