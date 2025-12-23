# Online Food Ordering Application

A comprehensive web-based food ordering platform built with HTML, CSS, JavaScript, and Bootstrap as part of the Full Stack Development Program Phase-End Project.

## 🎯 Project Objective

To demonstrate the design, development, and deployment of an Online Food Ordering Application for managing restaurant menus, orders, and user interactions. This project focuses on creating a responsive web-based interface for users to browse food items, place orders, and manage profiles, while administrators handle menu updates and order tracking.

## 🌟 Features

### User Features
- **Browse Menu**: View all available food items with images, descriptions, and prices
- **Category Filtering**: Filter items by categories (Appetizers, Main Course, Desserts, Beverages)
- **Shopping Cart**: Add items to cart, adjust quantities, and remove items
- **Responsive Design**: Fully responsive layout that works on all devices
- **Order Placement**: Complete checkout with customer information and payment method selection
- **Real-time Updates**: AJAX-based dynamic content loading without page refresh

### Admin Features
- **Secure Login**: Admin authentication with username and password
- **Dashboard Overview**: View statistics including total items, orders, and revenue
- **Menu Management**: Add, view, and delete menu items
- **Order Tracking**: View all customer orders with details
- **Responsive Admin Panel**: Mobile-friendly admin interface

## 🛠️ Technologies Used

- **HTML5**: Semantic structure and content organization
- **CSS3**: Custom styling with animations and responsive design
- **JavaScript (ES6+)**: Client-side functionality and interactivity
- **Bootstrap 5.3**: Responsive grid system and UI components
- **Font Awesome**: Icons for better visual appeal
- **LocalStorage**: Client-side data persistence
- **AJAX Simulation**: Asynchronous data loading

## 📁 Project Structure

```
online-food-ordering-app/
├── index.html              # Main user interface page
├── admin.html              # Admin login and dashboard
├── README.md               # Project documentation
├── assets/
│   └── images/             # Food item images (local assets)
│       ├── spring-rolls.jpg
│       ├── paneer-tikka.jpg
│       ├── butter-chicken.jpg
│       ├── biryani.jpg
│       ├── pizza.jpg
│       ├── pasta.jpg
│       ├── gulab-jamun.jpg
│       ├── chocolate-brownie.jpg
│       ├── mango-lassi.jpg
│       └── cold-coffee.jpg
├── css/
│   └── style.css           # Custom styles
└── js/
    └── app.js              # Application logic
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- Basic understanding of HTML, CSS, and JavaScript

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shhweta/online-food-ordering-app.git
   cd online-food-ordering-app
   ```

2. **Open in VS Code** (optional)
   ```bash
   code .
   ```

3. **Launch the application**
   - Open `index.html` in your web browser
   - Or use Live Server extension in VS Code

### Admin Access
- **URL**: Open `admin.html`
- **Username**: `admin`
- **Password**: `admin123`

## 💡 Usage Guide

### For Users

1. **Browse Menu**
   - Visit the homepage to view all available food items
   - Use category filters to narrow down your choices

2. **Add to Cart**
   - Click "Add" button on any food item
   - View cart by clicking the cart icon in navigation

3. **Place Order**
   - Click "Checkout" in the cart modal
   - Fill in your details (name, email, phone, address)
   - Select payment method
   - Click "Place Order" to complete

### For Administrators

1. **Login**
   - Navigate to `admin.html`
   - Enter credentials (admin/admin123)

2. **Manage Menu**
   - Click "Manage Menu" in sidebar
   - Add new items using the "Add New Item" button
   - Delete existing items as needed

3. **View Orders**
   - Click "Orders" in sidebar
   - Review all customer orders with details

## 🎨 Key Features Implemented

### Task 1: Git Repository ✅
- Remote repository set up on GitHub
- Version control for tracking changes

### Task 2 & 3: HTML & CSS ✅
- Semantic HTML5 structure
- Custom CSS with responsive design
- Bootstrap integration for UI components
- Mobile-first approach

### Task 4: JavaScript Interactivity ✅
- Form validation
- Dynamic menu loading
- Cart management system
- Real-time cart updates
- Event handling and user interactions

### Task 5: AJAX Implementation ✅
- Simulated AJAX calls for menu loading
- Asynchronous data operations
- LocalStorage for data persistence
- No page refresh required for updates

## 📱 Responsive Design

The application is fully responsive and tested on:
- Desktop (1920x1080 and above)
- Laptop (1366x768)
- Tablet (768x1024)
- Mobile (375x667 and above)

## 🎯 Learning Outcomes

This project demonstrates proficiency in:
1. Frontend web development fundamentals
2. Responsive web design principles
3. JavaScript DOM manipulation
4. AJAX and asynchronous programming
5. Local storage API
6. Form validation and user input handling
7. Bootstrap framework integration
8. Git version control
9. UI/UX best practices

## 🔒 Security Notes

**Important**: This is a frontend-only educational project. In a production environment:
- Admin credentials should be stored securely on the server
- Authentication should use proper backend APIs
- Payment processing should use secure gateways
- Data should be stored in databases, not LocalStorage
- HTTPS should be enforced

## 🐛 Known Limitations

- Data is stored in browser's LocalStorage (cleared when cache is cleared)
- No actual payment processing
- No backend server integration
- Admin password is hardcoded (for demonstration only)

## 🚀 Future Enhancements

- Backend integration with Node.js/Express
- Database implementation (MongoDB/MySQL)
- Real payment gateway integration
- User authentication and profiles
- Order status tracking
- Email notifications
- Search functionality
- Reviews and ratings system

## 📄 License

This project is created for educational purposes as part of the Full Stack Development Program.

## 👤 Author

**Shweta Sharma**
- GitHub: [@shhweta](https://github.com/shhweta)

## 🙏 Acknowledgments

- Full Stack Development Program with Generative AI
- Bootstrap Documentation
- Font Awesome
- Food images sourced from Unsplash and stored locally

---

**Note**: This project is submitted as part of the Foundations of Frontend Development Phase-End Project.

**Date**: December 2025