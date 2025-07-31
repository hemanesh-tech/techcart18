export class UIManager {
  constructor() {
    this.currentPage = 'home';
  }

  showNotification(message, type = 'success') {
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

  showLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = `
        <div class="flex justify-center items-center py-8">
          <div class="loading"></div>
          <span class="ml-2">Loading...</span>
        </div>
      `;
    }
  }

  hideLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = '';
    }
  }

  formatPrice(price) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(price);
  }

  formatDate(date) {
    return new Intl.DateTimeFormat('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  }

  createProductCard(product) {
    return `
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
            <span class="font-bold text-lg">${this.formatPrice(product.price)}</span>
            ${product.originalPrice ? `
              <span class="text-sm text-gray-500 line-through ml-2">${this.formatPrice(product.originalPrice)}</span>
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
    `;
  }

  renderStars(rating) {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    let stars = '';

    for (let i = 0; i < fullStars; i++) {
      stars += '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>';
    }

    for (let i = 0; i < emptyStars; i++) {
      stars += '<svg class="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>';
    }

    return stars;
  }

  showModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }

  hideModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }

  toggleModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal.classList.contains('hidden')) {
      this.showModal(modalId);
    } else {
      this.hideModal(modalId);
    }
  }
}