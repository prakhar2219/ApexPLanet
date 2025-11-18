// Product Data
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "electronics",
    price: 99.99,
    description: "Premium wireless headphones with noise cancellation and 30-hour battery life.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"
  },
  {
    id: 2,
    name: "Smart Watch",
    category: "electronics",
    price: 249.99,
    description: "Feature-rich smartwatch with fitness tracking, heart rate monitor, and GPS.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop"
  },
  {
    id: 3,
    name: "Laptop Stand",
    category: "electronics",
    price: 49.99,
    description: "Ergonomic aluminum laptop stand with adjustable height and ventilation.",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop"
  },
  {
    id: 4,
    name: "Cotton T-Shirt",
    category: "clothing",
    price: 24.99,
    description: "Comfortable 100% organic cotton t-shirt available in multiple colors.",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop"
  },
  {
    id: 5,
    name: "Denim Jeans",
    category: "clothing",
    price: 79.99,
    description: "Classic fit denim jeans with stretch for comfort and durability.",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop"
  },
  {
    id: 6,
    name: "Winter Jacket",
    category: "clothing",
    price: 129.99,
    description: "Warm and waterproof winter jacket with insulated lining.",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop"
  },
  {
    id: 7,
    name: "JavaScript Guide",
    category: "books",
    price: 34.99,
    description: "Comprehensive guide to modern JavaScript programming and best practices.",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop"
  },
  {
    id: 8,
    name: "Web Design Book",
    category: "books",
    price: 29.99,
    description: "Learn the principles of beautiful and functional web design.",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=400&fit=crop"
  },
  {
    id: 9,
    name: "Coffee Table Book",
    category: "books",
    price: 45.99,
    description: "Stunning photography collection perfect for your coffee table.",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop"
  },
  {
    id: 10,
    name: "Desk Lamp",
    category: "home",
    price: 39.99,
    description: "Modern LED desk lamp with adjustable brightness and color temperature.",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop"
  },
  {
    id: 11,
    name: "Throw Pillow Set",
    category: "home",
    price: 29.99,
    description: "Set of 2 decorative throw pillows with premium fabric covers.",
    image: "https://images.unsplash.com/photo-1584100936595-b1e8d1c6e6c8?w=400&h=400&fit=crop"
  },
  {
    id: 12,
    name: "Plant Pot Set",
    category: "home",
    price: 19.99,
    description: "Set of 3 ceramic plant pots in various sizes for indoor plants.",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop"
  }
];

// Cart State
let cart = loadCartFromStorage();

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

function initializeApp() {
  renderProducts();
  renderFeaturedProducts();
  renderNewArrivals();
  updateCartCount();
  setupEventListeners();
  updateCartDisplay();
  updateCheckoutSummary();
}

// Event Listeners
function setupEventListeners() {
  // Navigation
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const section = link.getAttribute('data-section');
      showSection(section);
    });
  });

  // Search
  document.getElementById('searchInput').addEventListener('input', handleSearch);
  
  // Filters
  document.getElementById('categoryFilter').addEventListener('change', handleFilter);
  document.getElementById('sortSelect').addEventListener('change', handleSort);

  // Cart buttons
  document.getElementById('clearCartBtn').addEventListener('click', clearCart);
  
  // Checkout form
  document.getElementById('checkoutForm').addEventListener('submit', handleCheckout);

  // Modal
  document.querySelector('.close-modal').addEventListener('click', closeModal);
  document.getElementById('productModal').addEventListener('click', (e) => {
    if (e.target.id === 'productModal') {
      closeModal();
    }
  });

  // Card number formatting
  document.getElementById('cardNumber').addEventListener('input', formatCardNumber);
  document.getElementById('expiryDate').addEventListener('input', formatExpiryDate);
  document.getElementById('cvv').addEventListener('input', formatCVV);

  // Newsletter enter key
  const newsletterInput = document.getElementById('newsletterEmail');
  if (newsletterInput) {
    newsletterInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        handleNewsletter();
      }
    });
  }
}

// Navigation
function showSection(sectionName) {
  // Hide all sections
  document.querySelectorAll('.section').forEach(section => {
    section.classList.remove('active');
  });

  // Show selected section
  const targetSection = document.getElementById(sectionName);
  if (targetSection) {
    targetSection.classList.add('active');
  }

  // Update nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-section') === sectionName) {
      link.classList.add('active');
    }
  });

  // Update checkout summary when viewing checkout
  if (sectionName === 'checkout') {
    updateCheckoutSummary();
  }
}

// Product Rendering
function renderProducts(filteredProducts = products) {
  const productsGrid = document.getElementById('productsGrid');
  productsGrid.innerHTML = '';

  if (filteredProducts.length === 0) {
    productsGrid.innerHTML = '<div class="empty-cart"><p>No products found. Try adjusting your filters.</p></div>';
    return;
  }

  filteredProducts.forEach(product => {
    const productCard = createProductCard(product);
    productsGrid.appendChild(productCard);
  });
}

function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/400'">
    <div class="product-info">
      <div class="product-category">${product.category}</div>
      <h3 class="product-name">${product.name}</h3>
      <p class="product-description">${product.description}</p>
      <div class="product-footer">
        <span class="product-price">$${product.price.toFixed(2)}</span>
        <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
          Add to Cart
        </button>
      </div>
    </div>
  `;

  // Add click event to show product details
  card.addEventListener('click', (e) => {
    if (!e.target.classList.contains('add-to-cart-btn')) {
      showProductModal(product);
    }
  });

  return card;
}

// Product Modal
function showProductModal(product) {
  const modal = document.getElementById('productModal');
  const modalContent = document.getElementById('modalProductDetails');
  
  modalContent.innerHTML = `
    <img src="${product.image}" alt="${product.name}" class="product-image" style="width: 100%; margin-bottom: 1rem;" onerror="this.src='https://via.placeholder.com/400'">
    <div class="product-category">${product.category}</div>
    <h2 class="product-name">${product.name}</h2>
    <p style="margin: 1rem 0; color: var(--text-secondary);">${product.description}</p>
    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 2rem;">
      <span class="product-price">$${product.price.toFixed(2)}</span>
      <button class="btn btn-primary" onclick="addToCart(${product.id}); closeModal();">
        Add to Cart
      </button>
    </div>
  `;
  
  modal.classList.add('active');
}

function closeModal() {
  document.getElementById('productModal').classList.remove('active');
}

// Cart Functions
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }

  saveCartToStorage();
  updateCartCount();
  updateCartDisplay();
  showNotification(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCartToStorage();
  updateCartCount();
  updateCartDisplay();
  updateCheckoutSummary();
}

function updateQuantity(productId, change) {
  const item = cart.find(item => item.id === productId);
  if (!item) return;

  item.quantity += change;
  
  if (item.quantity <= 0) {
    removeFromCart(productId);
  } else {
    saveCartToStorage();
    updateCartDisplay();
    updateCheckoutSummary();
  }
}

function clearCart() {
  if (cart.length === 0) return;
  
  if (confirm('Are you sure you want to clear your cart?')) {
    cart = [];
    saveCartToStorage();
    updateCartCount();
    updateCartDisplay();
    updateCheckoutSummary();
    showNotification('Cart cleared');
  }
}

function updateCartDisplay() {
  const cartItems = document.getElementById('cartItems');
  
  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        <div class="empty-cart-icon">🛒</div>
        <h3>Your cart is empty</h3>
        <p>Add some products to get started!</p>
        <button class="btn btn-primary" onclick="showSection('products')" style="margin-top: 1rem;">
          Browse Products
        </button>
      </div>
    `;
    document.getElementById('checkoutBtn').disabled = true;
    updateCartSummary();
    return;
  }

  document.getElementById('checkoutBtn').disabled = false;
  
  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" class="cart-item-image" onerror="this.src='https://via.placeholder.com/400'">
      <div class="cart-item-details">
        <h3 class="cart-item-name">${item.name}</h3>
        <p class="cart-item-price">$${item.price.toFixed(2)} each</p>
        <div class="cart-item-controls">
          <div class="quantity-controls">
            <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
            <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                   onchange="updateQuantityFromInput(${item.id}, this.value)">
            <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
          </div>
          <button class="btn btn-danger" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
      </div>
      <div class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</div>
    </div>
  `).join('');

  updateCartSummary();
}

function updateQuantityFromInput(productId, value) {
  const quantity = parseInt(value);
  if (isNaN(quantity) || quantity < 1) return;
  
  const item = cart.find(item => item.id === productId);
  if (!item) return;
  
  item.quantity = quantity;
  saveCartToStorage();
  updateCartDisplay();
  updateCheckoutSummary();
}

function updateCartSummary() {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1;
  const shipping = subtotal > 0 ? (subtotal > 100 ? 0 : 10) : 0;
  const total = subtotal + tax + shipping;

  document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
  document.getElementById('shipping').textContent = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
  document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cartCount').textContent = count;
}

// Checkout
function updateCheckoutSummary() {
  if (cart.length === 0) return;

  const checkoutItems = document.getElementById('checkoutItems');
  checkoutItems.innerHTML = cart.map(item => `
    <div class="checkout-item">
      <span>${item.name} x${item.quantity}</span>
      <span>$${(item.price * item.quantity).toFixed(2)}</span>
    </div>
  `).join('');

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1;
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + tax + shipping;

  document.getElementById('checkoutSubtotal').textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById('checkoutTax').textContent = `$${tax.toFixed(2)}`;
  document.getElementById('checkoutShipping').textContent = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
  document.getElementById('checkoutTotal').textContent = `$${total.toFixed(2)}`;
}

function handleCheckout(e) {
  e.preventDefault();
  
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  const formData = new FormData(e.target);
  const orderData = {
    customer: Object.fromEntries(formData),
    items: cart,
    subtotal: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    tax: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 0.1,
    shipping: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) > 100 ? 0 : 10,
    orderDate: new Date().toLocaleString()
  };

  orderData.total = orderData.subtotal + orderData.tax + orderData.shipping;

  // Display order confirmation
  displayOrderConfirmation(orderData);
  
  // Clear cart
  cart = [];
  saveCartToStorage();
  updateCartCount();
  
  // Reset form
  e.target.reset();
}

function displayOrderConfirmation(orderData) {
  const orderDetails = document.getElementById('orderDetails');
  orderDetails.innerHTML = `
    <h3>Order Details</h3>
    <p><strong>Order Date:</strong> ${orderData.orderDate}</p>
    <p><strong>Customer:</strong> ${orderData.customer.fullName}</p>
    <p><strong>Email:</strong> ${orderData.customer.email}</p>
    <p><strong>Shipping Address:</strong> ${orderData.customer.address}, ${orderData.customer.city}, ${orderData.customer.zipCode}</p>
    <hr style="margin: 1rem 0; border: none; border-top: 1px solid var(--border-color);">
    <p><strong>Items:</strong> ${orderData.items.length}</p>
    <p><strong>Total:</strong> $${orderData.total.toFixed(2)}</p>
  `;

  showSection('orderConfirmation');
}

function resetApp() {
  cart = [];
  saveCartToStorage();
  updateCartCount();
  showSection('products');
}

// Search and Filter
let filteredProducts = products;

function handleSearch() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  applyFilters();
}

function handleFilter() {
  applyFilters();
}

function handleSort() {
  applyFilters();
}

function applyFilters() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const category = document.getElementById('categoryFilter').value;
  const sortBy = document.getElementById('sortSelect').value;

  // Filter
  filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                         product.description.toLowerCase().includes(searchTerm);
    const matchesCategory = category === 'all' || product.category === category;
    return matchesSearch && matchesCategory;
  });

  // Sort
  switch (sortBy) {
    case 'price-low':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case 'name':
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      // Keep original order
      break;
  }

  renderProducts(filteredProducts);
}

// Local Storage
function saveCartToStorage() {
  localStorage.setItem('shopHub_cart', JSON.stringify(cart));
}

function loadCartFromStorage() {
  const saved = localStorage.getItem('shopHub_cart');
  return saved ? JSON.parse(saved) : [];
}

// Utility Functions
function formatCardNumber(e) {
  let value = e.target.value.replace(/\s/g, '');
  let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
  e.target.value = formattedValue;
}

function formatExpiryDate(e) {
  let value = e.target.value.replace(/\D/g, '');
  if (value.length >= 2) {
    value = value.substring(0, 2) + '/' + value.substring(2, 4);
  }
  e.target.value = value;
}

function formatCVV(e) {
  e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
}

function showNotification(message) {
  // Simple notification (could be enhanced with a toast library)
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: var(--success-color);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: var(--radius);
    box-shadow: var(--shadow-lg);
    z-index: 2000;
    animation: slideIn 0.3s ease;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

// Featured Products on Home Page
function renderFeaturedProducts() {
  const featuredGrid = document.getElementById('featuredProductsGrid');
  if (!featuredGrid) return;

  // Get first 8 products as featured
  const featuredProducts = products.slice(0, 8);
  
  featuredGrid.innerHTML = featuredProducts.map(product => {
    return createFeaturedProductCard(product);
  }).join('');

  // Add click event listeners to featured product cards
  featuredGrid.querySelectorAll('.product-card').forEach((card, index) => {
    card.addEventListener('click', (e) => {
      if (!e.target.classList.contains('add-to-cart-btn')) {
        showProductModal(featuredProducts[index]);
      }
    });
  });
}

function createFeaturedProductCard(product) {
  return `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/400'">
      <div class="product-info">
        <div class="product-category">${product.category}</div>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-footer">
          <span class="product-price">$${product.price.toFixed(2)}</span>
          <button class="add-to-cart-btn" onclick="addToCart(${product.id}); event.stopPropagation();">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  `;
}

// New Arrivals on Home Page
function renderNewArrivals() {
  const newArrivalsGrid = document.getElementById('newArrivalsGrid');
  if (!newArrivalsGrid) return;

  // Get last 6 products as new arrivals
  const newArrivals = products.slice(-6);
  
  newArrivalsGrid.innerHTML = newArrivals.map(product => {
    return createFeaturedProductCard(product);
  }).join('');

  // Add click event listeners to new arrivals product cards
  newArrivalsGrid.querySelectorAll('.product-card').forEach((card, index) => {
    card.addEventListener('click', (e) => {
      if (!e.target.classList.contains('add-to-cart-btn')) {
        showProductModal(newArrivals[index]);
      }
    });
  });
}

// Newsletter Signup
function handleNewsletter() {
  const emailInput = document.getElementById('newsletterEmail');
  const email = emailInput.value.trim();

  if (!email) {
    showNotification('Please enter your email address');
    return;
  }

  if (!isValidEmail(email)) {
    showNotification('Please enter a valid email address');
    return;
  }

  // Save to localStorage (in a real app, this would be sent to a server)
  const subscribers = JSON.parse(localStorage.getItem('shopHub_newsletter') || '[]');
  if (subscribers.includes(email)) {
    showNotification('You are already subscribed!');
  } else {
    subscribers.push(email);
    localStorage.setItem('shopHub_newsletter', JSON.stringify(subscribers));
    showNotification('Thank you for subscribing to our newsletter!');
    emailInput.value = '';
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

