// ===========================
// Global Variables and State
// ===========================
let menuItems = [];
let cart = [];
let orders = [];
let isAdminLoggedIn = false;

// Admin credentials (in production, this would be handled server-side)
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
};

// ===========================
// Initialize Application
// ===========================
document.addEventListener('DOMContentLoaded', function() {
  const currentPage = window.location.pathname;
  
  if (currentPage.includes('admin.html')) {
    initializeAdminPage();
  } else if (currentPage.includes('index.html') || currentPage.endsWith('/')) {
    initializeUserPage();
  }
});

// ===========================
// User Page Functions
// ===========================
function initializeUserPage() {
  loadMenuItems();
  setupCategoryFilters();
  setupCartModal();
  setupCheckoutForm();
  updateCartCount();
}

// Load menu items using AJAX simulation
function loadMenuItems() {
  const loadingSpinner = document.getElementById('loadingSpinner');
  const menuContainer = document.getElementById('menuContainer');
  
  // Show loading spinner
  loadingSpinner.style.display = 'block';
  menuContainer.innerHTML = '';
  
  // Simulate AJAX call with setTimeout
  setTimeout(() => {
    // Get menu items from localStorage or use default
    const storedItems = localStorage.getItem('menuItems');
    if (storedItems) {
      menuItems = JSON.parse(storedItems);
    } else {
      menuItems = getDefaultMenuItems();
      localStorage.setItem('menuItems', JSON.stringify(menuItems));
    }
    
    // Hide loading spinner
    loadingSpinner.style.display = 'none';
    
    // Display menu items
    displayMenuItems(menuItems);
  }, 1000); // Simulate network delay
}

// Get default menu items
function getDefaultMenuItems() {
  return [
    {
      id: 1,
      name: 'Spring Rolls',
      category: 'appetizers',
      price: 150,
      description: 'Crispy vegetable spring rolls served with sweet chili sauce',
      image: 'assets/images/spring-rolls.jpg'
    },
    {
      id: 2,
      name: 'Paneer Tikka',
      category: 'appetizers',
      price: 200,
      description: 'Marinated cottage cheese grilled to perfection',
      image: 'assets/images/paneer-tikka.jpg'
    },
    {
      id: 3,
      name: 'Butter Chicken',
      category: 'main-course',
      price: 350,
      description: 'Tender chicken in rich tomato and butter gravy',
      image: 'assets/images/butter-chicken.jpg'
    },
    {
      id: 4,
      name: 'Biryani',
      category: 'main-course',
      price: 300,
      description: 'Fragrant basmati rice with aromatic spices and vegetables',
      image: 'assets/images/biryani.jpg'
    },
    {
      id: 5,
      name: 'Margherita Pizza',
      category: 'main-course',
      price: 400,
      description: 'Classic pizza with tomato sauce, mozzarella, and basil',
      image: 'assets/images/pizza.jpg'
    },
    {
      id: 6,
      name: 'Pasta Alfredo',
      category: 'main-course',
      price: 280,
      description: 'Creamy fettuccine pasta with parmesan cheese',
      image: 'assets/images/pasta.jpg'
    },
    {
      id: 7,
      name: 'Cake',
      category: 'desserts',
      price: 80,
      description: 'Soft milk dumplings soaked in rose-flavored syrup',
      image: 'assets/images/gulab-jamun.jpg'
    },
    {
      id: 8,
      name: 'Chocolate Brownie',
      category: 'desserts',
      price: 120,
      description: 'Rich chocolate brownie with vanilla ice cream',
      image: 'assets/images/chocolate-brownie.jpg'
    },
    {
      id: 9,
      name: 'Mango Lassi',
      category: 'beverages',
      price: 100,
      description: 'Traditional yogurt-based mango smoothie',
      image: 'assets/images/mango-lassi.jpg'
    },
    {
      id: 10,
      name: 'Cold Coffee',
      category: 'beverages',
      price: 120,
      description: 'Chilled roasted coffee with milk and ice cream',
      image: 'assets/images/cold-coffee.jpg'
    }
  ];
}

// Display menu items
function displayMenuItems(items, category = 'all') {
  const menuContainer = document.getElementById('menuContainer');
  menuContainer.innerHTML = '';
  
  const filteredItems = category === 'all' 
    ? items 
    : items.filter(item => item.category === category);
  
  if (filteredItems.length === 0) {
    menuContainer.innerHTML = '<div class="col-12 text-center py-5"><p class="text-muted">No items found in this category.</p></div>';
    return;
  }
  
  filteredItems.forEach(item => {
    const menuItemDiv = document.createElement('div');
    menuItemDiv.className = 'col';
    menuItemDiv.innerHTML = `
      <div class="menu-item">
        <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/400x200?text=Food+Item'">
        <div class="menu-item-content">
          <span class="category-badge">${item.category.replace('-', ' ')}</span>
          <h5>${item.name}</h5>
          <p>${item.description}</p>
          <div class="menu-item-footer">
            <span class="price">₹${item.price}</span>
            <button class="add-to-cart-btn" onclick="addToCart(${item.id})">
              <i class="fas fa-plus"></i> Add
            </button>
          </div>
        </div>
      </div>
    `;
    menuContainer.appendChild(menuItemDiv);
  });
}

// Setup category filters
function setupCategoryFilters() {
  const categoryButtons = document.querySelectorAll('.category-btn');
  
  categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Update active state
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Filter items
      const category = this.getAttribute('data-category');
      displayMenuItems(menuItems, category);
    });
  });
}

// Add item to cart
function addToCart(itemId) {
  const item = menuItems.find(i => i.id === itemId);
  if (!item) return;
  
  const existingItem = cart.find(i => i.id === itemId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...item,
      quantity: 1
    });
  }
  
  updateCartCount();
  saveCart();
  
  // Show feedback
  showToast('Item added to cart!', 'success');
}

// Update cart count
function updateCartCount() {
  const cartCount = document.getElementById('cartCount');
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
}

// Setup cart modal
function setupCartModal() {
  const viewCartBtn = document.getElementById('viewCartBtn');
  const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
  
  // Load cart from localStorage
  loadCart();
  
  viewCartBtn.addEventListener('click', function() {
    displayCartItems();
    cartModal.show();
  });
}

// Display cart items
function displayCartItems() {
  const cartItemsContainer = document.getElementById('cartItemsContainer');
  const emptyCartMessage = document.getElementById('emptyCartMessage');
  const totalPriceSpan = document.getElementById('totalPrice');
  
  if (cart.length === 0) {
    cartItemsContainer.style.display = 'none';
    emptyCartMessage.style.display = 'block';
    totalPriceSpan.textContent = '0';
    return;
  }
  
  cartItemsContainer.style.display = 'block';
  emptyCartMessage.style.display = 'none';
  
  cartItemsContainer.innerHTML = '';
  let total = 0;
  
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    
    const cartItemDiv = document.createElement('div');
    cartItemDiv.className = 'cart-item';
    cartItemDiv.innerHTML = `
      <div class="cart-item-details">
        <h6>${item.name}</h6>
        <p class="text-muted mb-0">₹${item.price} × ${item.quantity} = ₹${itemTotal}</p>
      </div>
      <div class="cart-item-actions">
        <div class="quantity-control">
          <button onclick="decreaseQuantity(${item.id})">-</button>
          <span>${item.quantity}</span>
          <button onclick="increaseQuantity(${item.id})">+</button>
        </div>
        <button class="remove-item-btn" onclick="removeFromCart(${item.id})">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;
    cartItemsContainer.appendChild(cartItemDiv);
  });
  
  totalPriceSpan.textContent = total;
}

// Increase quantity
function increaseQuantity(itemId) {
  const item = cart.find(i => i.id === itemId);
  if (item) {
    item.quantity += 1;
    displayCartItems();
    updateCartCount();
    saveCart();
  }
}

// Decrease quantity
function decreaseQuantity(itemId) {
  const item = cart.find(i => i.id === itemId);
  if (item && item.quantity > 1) {
    item.quantity -= 1;
    displayCartItems();
    updateCartCount();
    saveCart();
  }
}

// Remove item from cart
function removeFromCart(itemId) {
  cart = cart.filter(i => i.id !== itemId);
  displayCartItems();
  updateCartCount();
  saveCart();
  showToast('Item removed from cart', 'info');
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCart() {
  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    cart = JSON.parse(storedCart);
    updateCartCount();
  }
}

// Setup checkout form
function setupCheckoutForm() {
  const checkoutBtn = document.getElementById('checkoutBtn');
  const placeOrderBtn = document.getElementById('placeOrderBtn');
  const checkoutModal = new bootstrap.Modal(document.getElementById('checkoutModal'));
  const cartModal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
  
  checkoutBtn.addEventListener('click', function() {
    if (cart.length === 0) {
      showToast('Your cart is empty!', 'warning');
      return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('checkoutTotal').textContent = total;
    
    // Close cart modal and open checkout modal
    if (cartModal) cartModal.hide();
    setTimeout(() => checkoutModal.show(), 300);
  });
  
  placeOrderBtn.addEventListener('click', function() {
    const form = document.getElementById('checkoutForm');
    
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }
    
    // Collect order data
    const order = {
      id: Date.now(),
      customer: {
        name: document.getElementById('customerName').value,
        email: document.getElementById('customerEmail').value,
        phone: document.getElementById('customerPhone').value,
        address: document.getElementById('deliveryAddress').value
      },
      items: [...cart],
      total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      paymentMethod: document.getElementById('paymentMethod').value,
      date: new Date().toISOString(),
      status: 'pending'
    };
    
    // Save order using AJAX simulation
    saveOrder(order);
    
    // Clear cart
    cart = [];
    saveCart();
    updateCartCount();
    
    // Close modal
    checkoutModal.hide();
    
    // Show success message
    showToast('Order placed successfully! Order ID: ' + order.id, 'success');
    
    // Reset form
    form.reset();
    form.classList.remove('was-validated');
  });
}

// Save order (simulated AJAX)
function saveOrder(order) {
  const storedOrders = localStorage.getItem('orders');
  orders = storedOrders ? JSON.parse(storedOrders) : [];
  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));
}

// Show toast notification
function showToast(message, type = 'info') {
  // Create toast element
  const toastDiv = document.createElement('div');
  toastDiv.className = `alert alert-${type} position-fixed top-0 start-50 translate-middle-x mt-3`;
  toastDiv.style.zIndex = '9999';
  toastDiv.style.minWidth = '300px';
  toastDiv.innerHTML = `
    <div class="d-flex align-items-center">
      <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'} me-2"></i>
      <span>${message}</span>
    </div>
  `;
  
  document.body.appendChild(toastDiv);
  
  // Auto remove after 3 seconds
  setTimeout(() => {
    toastDiv.remove();
  }, 3000);
}

// ===========================
// Admin Page Functions
// ===========================
function initializeAdminPage() {
  const loginForm = document.getElementById('adminLoginForm');
  const logoutBtn = document.getElementById('logoutBtn');
  const togglePasswordBtn = document.getElementById('togglePassword');
  
  // Check if already logged in
  checkAdminSession();
  
  // Login form submission
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    handleAdminLogin();
  });
  
  // Logout button
  if (logoutBtn) {
    logoutBtn.addEventListener('click', handleAdminLogout);
  }
  
  // Toggle password visibility
  if (togglePasswordBtn) {
    togglePasswordBtn.addEventListener('click', function() {
      const passwordInput = document.getElementById('password');
      const icon = this.querySelector('i');
      
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
      } else {
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
      }
    });
  }
  
  // Setup sidebar navigation
  setupAdminNavigation();
  
  // Setup admin functionality
  setupAddItemForm();
}

// Handle admin login
function handleAdminLogin() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const errorMsg = document.getElementById('errorMsg');
  
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    isAdminLoggedIn = true;
    sessionStorage.setItem('adminLoggedIn', 'true');
    sessionStorage.setItem('adminUsername', username);
    
    // Show dashboard
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('dashboardSection').style.display = 'block';
    document.getElementById('adminUsername').textContent = username;
    
    // Load dashboard data
    loadAdminDashboard();
  } else {
    errorMsg.textContent = 'Invalid username or password!';
    errorMsg.style.display = 'block';
    
    setTimeout(() => {
      errorMsg.style.display = 'none';
    }, 3000);
  }
}

// Check admin session
function checkAdminSession() {
  const loggedIn = sessionStorage.getItem('adminLoggedIn');
  const username = sessionStorage.getItem('adminUsername');
  
  if (loggedIn === 'true') {
    isAdminLoggedIn = true;
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('dashboardSection').style.display = 'block';
    document.getElementById('adminUsername').textContent = username || 'Admin';
    loadAdminDashboard();
  }
}

// Handle admin logout
function handleAdminLogout() {
  isAdminLoggedIn = false;
  sessionStorage.removeItem('adminLoggedIn');
  sessionStorage.removeItem('adminUsername');
  
  document.getElementById('loginSection').style.display = 'block';
  document.getElementById('dashboardSection').style.display = 'none';
  
  // Reset form
  document.getElementById('adminLoginForm').reset();
}

// Setup admin navigation
function setupAdminNavigation() {
  const navLinks = document.querySelectorAll('.sidebar .list-group-item');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Update active state
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      
      // Show corresponding section
      const section = this.getAttribute('data-section');
      showAdminSection(section);
    });
  });
}

// Show admin section
function showAdminSection(section) {
  document.querySelectorAll('.content-section').forEach(s => s.style.display = 'none');
  
  switch(section) {
    case 'overview':
      document.getElementById('overviewSection').style.display = 'block';
      updateDashboardStats();
      break;
    case 'menu':
      document.getElementById('menuSection').style.display = 'block';
      loadAdminMenuItems();
      break;
    case 'orders':
      document.getElementById('ordersSection').style.display = 'block';
      loadAdminOrders();
      break;
  }
}

// Load admin dashboard
function loadAdminDashboard() {
  updateDashboardStats();
  loadAdminMenuItems();
  loadAdminOrders();
}

// Update dashboard statistics
function updateDashboardStats() {
  const storedItems = localStorage.getItem('menuItems');
  const storedOrders = localStorage.getItem('orders');
  
  const items = storedItems ? JSON.parse(storedItems) : [];
  const orders = storedOrders ? JSON.parse(storedOrders) : [];
  
  document.getElementById('totalItems').textContent = items.length;
  document.getElementById('totalOrders').textContent = orders.length;
  
  const revenue = orders.reduce((sum, order) => sum + order.total, 0);
  document.getElementById('totalRevenue').textContent = revenue;
}

// Load admin menu items
function loadAdminMenuItems() {
  const storedItems = localStorage.getItem('menuItems');
  menuItems = storedItems ? JSON.parse(storedItems) : getDefaultMenuItems();
  
  const tableBody = document.getElementById('menuTableBody');
  tableBody.innerHTML = '';
  
  menuItems.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.id}</td>
      <td>${item.name}</td>
      <td><span class="badge bg-secondary">${item.category.replace('-', ' ')}</span></td>
      <td>₹${item.price}</td>
      <td>${item.description.substring(0, 50)}...</td>
      <td>
        <button class="action-btn btn-delete" onclick="deleteMenuItem(${item.id})">
          <i class="fas fa-trash"></i> Delete
        </button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Load admin orders
function loadAdminOrders() {
  const storedOrders = localStorage.getItem('orders');
  orders = storedOrders ? JSON.parse(storedOrders) : [];
  
  const tableBody = document.getElementById('ordersTableBody');
  tableBody.innerHTML = '';
  
  if (orders.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="6" class="text-center text-muted">No orders yet</td></tr>';
    return;
  }
  
  orders.forEach(order => {
    const row = document.createElement('tr');
    const itemsList = order.items.map(item => `${item.name} (${item.quantity})`).join(', ');
    const orderDate = new Date(order.date).toLocaleDateString();
    
    row.innerHTML = `
      <td>#${order.id}</td>
      <td>${order.customer.name}</td>
      <td>${itemsList.substring(0, 50)}${itemsList.length > 50 ? '...' : ''}</td>
      <td>₹${order.total}</td>
      <td><span class="badge bg-info">${order.paymentMethod.toUpperCase()}</span></td>
      <td>${orderDate}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Setup add item form
function setupAddItemForm() {
  const saveItemBtn = document.getElementById('saveItemBtn');
  
  if (saveItemBtn) {
    saveItemBtn.addEventListener('click', function() {
      const form = document.getElementById('addItemForm');
      
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
      }
      
      const newItem = {
        id: Date.now(),
        name: document.getElementById('itemName').value,
        category: document.getElementById('itemCategory').value,
        price: parseFloat(document.getElementById('itemPrice').value),
        description: document.getElementById('itemDescription').value,
        image: document.getElementById('itemImage').value
      };
      
      // Add to menu items
      menuItems.push(newItem);
      localStorage.setItem('menuItems', JSON.stringify(menuItems));
      
      // Close modal
      const modal = bootstrap.Modal.getInstance(document.getElementById('addItemModal'));
      modal.hide();
      
      // Reload menu items
      loadAdminMenuItems();
      updateDashboardStats();
      
      // Reset form
      form.reset();
      form.classList.remove('was-validated');
      
      showToast('Menu item added successfully!', 'success');
    });
  }
}

// Delete menu item
function deleteMenuItem(itemId) {
  if (confirm('Are you sure you want to delete this item?')) {
    menuItems = menuItems.filter(item => item.id !== itemId);
    localStorage.setItem('menuItems', JSON.stringify(menuItems));
    loadAdminMenuItems();
    updateDashboardStats();
    showToast('Menu item deleted successfully!', 'success');
  }
}