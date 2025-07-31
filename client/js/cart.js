export class CartManager {
  constructor(api) {
    this.api = api;
    this.cart = null;
  }

  async loadCart() {
    try {
      const response = await this.api.get('/cart');
      if (response.success) {
        this.cart = response.data.cart;
        this.updateCartUI();
      }
    } catch (error) {
      console.error('Failed to load cart:', error);
    }
  }

  async addToCart(productId, quantity = 1) {
    try {
      const response = await this.api.post('/cart/items', {
        productId,
        quantity
      });
      
      if (response.success) {
        this.cart = response.data.cart;
        this.updateCartUI();
        this.showNotification('Item added to cart!', 'success');
      }
    } catch (error) {
      console.error('Failed to add to cart:', error);
      this.showNotification(error.message || 'Failed to add to cart', 'error');
    }
  }

  async updateQuantity(productId, quantity) {
    try {
      const response = await this.api.put(`/cart/items/${productId}`, {
        quantity
      });
      
      if (response.success) {
        this.cart = response.data.cart;
        this.updateCartUI();
        this.showNotification('Cart updated!', 'success');
      }
    } catch (error) {
      console.error('Failed to update cart:', error);
      this.showNotification(error.message || 'Failed to update cart', 'error');
    }
  }

  async removeFromCart(productId) {
    try {
      const response = await this.api.delete(`/cart/items/${productId}`);
      
      if (response.success) {
        this.cart = response.data.cart;
        this.updateCartUI();
        this.showNotification('Item removed from cart', 'success');
      }
    } catch (error) {
      console.error('Failed to remove from cart:', error);
      this.showNotification(error.message || 'Failed to remove from cart', 'error');
    }
  }

  async clearCart() {
    try {
      const response = await this.api.delete('/cart');
      
      if (response.success) {
        this.cart = response.data.cart;
        this.updateCartUI();
        this.showNotification('Cart cleared', 'success');
      }
    } catch (error) {
      console.error('Failed to clear cart:', error);
      this.showNotification(error.message || 'Failed to clear cart', 'error');
    }
  }

  updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    
    if (this.cart && this.cart.items) {
      const totalItems = this.cart.items.reduce((sum, item) => sum + item.quantity, 0);
      cartCount.textContent = totalItems;
    } else {
      cartCount.textContent = '0';
    }
  }

  clearLocalCart() {
    this.cart = null;
    this.updateCartUI();
  }

  showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.remove('hidden');
    notification.classList.add('show');

    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.classList.add('hidden');
      }, 300);
    }, 3000);
  }
}