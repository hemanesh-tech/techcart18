export class AuthManager {
  constructor(api) {
    this.api = api;
    this.user = null;
  }

  async init() {
    const token = localStorage.getItem('techcart_token');
    if (token) {
      this.api.setToken(token);
      try {
        await this.getCurrentUser();
      } catch (error) {
        console.error('Failed to get current user:', error);
        this.logout();
      }
    }
    this.updateUI();
  }

  async login(email, password) {
    try {
      this.setLoadingState('login', true);
      
      const response = await this.api.post('/auth/login', { email, password });
      
      if (response.success) {
        this.api.setToken(response.data.token);
        this.user = response.data.user;
        this.updateUI();
        this.closeModals();
        this.showNotification('Login successful!', 'success');
        
        // Reload cart after login
        if (window.app && window.app.cart) {
          await window.app.cart.loadCart();
        }
      }
    } catch (error) {
      console.error('Login failed:', error);
      this.showNotification(error.message || 'Login failed', 'error');
    } finally {
      this.setLoadingState('login', false);
    }
  }

  async register(fullName, email, password, phone) {
    try {
      this.setLoadingState('register', true);
      
      const userData = { fullName, email, password };
      if (phone) userData.phone = phone;
      
      const response = await this.api.post('/auth/register', userData);
      
      if (response.success) {
        this.api.setToken(response.data.token);
        this.user = response.data.user;
        this.updateUI();
        this.closeModals();
        this.showNotification('Account created successfully!', 'success');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      this.showNotification(error.message || 'Registration failed', 'error');
    } finally {
      this.setLoadingState('register', false);
    }
  }

  async getCurrentUser() {
    try {
      const response = await this.api.get('/auth/me');
      if (response.success) {
        this.user = response.data.user;
        return this.user;
      }
    } catch (error) {
      throw error;
    }
  }

  logout() {
    this.api.setToken(null);
    this.user = null;
    this.updateUI();
    this.showNotification('Logged out successfully', 'success');
    
    // Clear cart
    if (window.app && window.app.cart) {
      window.app.cart.clearLocalCart();
    }
  }

  isAuthenticated() {
    return !!this.user;
  }

  updateUI() {
    const authLink = document.getElementById('auth-link');
    
    if (this.isAuthenticated()) {
      authLink.textContent = `Logout (${this.user.fullName})`;
    } else {
      authLink.textContent = 'Login/Sign Up';
    }
  }

  setLoadingState(type, loading) {
    const btnText = document.getElementById(`${type}-btn-text`);
    const loadingSpinner = document.getElementById(`${type}-loading`);
    
    if (loading) {
      btnText.classList.add('hidden');
      loadingSpinner.classList.remove('hidden');
    } else {
      btnText.classList.remove('hidden');
      loadingSpinner.classList.add('hidden');
    }
  }

  closeModals() {
    document.getElementById('login-modal').classList.add('hidden');
    document.getElementById('login-modal').classList.remove('flex');
    document.getElementById('register-modal').classList.add('hidden');
    document.getElementById('register-modal').classList.remove('flex');
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