# TechCart E-commerce Platform

A modern, full-stack e-commerce platform for electronics and computer components built with Node.js, Express, MongoDB, and Vanilla JavaScript.

## Features

### Backend Features
- **RESTful API** with Express.js
- **MongoDB** database with Mongoose ODM
- **JWT Authentication** with role-based access control
- **Product Management** with categories, reviews, and ratings
- **Shopping Cart** functionality
- **Order Management** with status tracking
- **Wishlist** functionality
- **User Profile** management with multiple addresses
- **Input Validation** with Joi
- **Security** with Helmet, CORS, and rate limiting
- **Error Handling** with custom middleware

### Frontend Features
- **Responsive Design** with Tailwind CSS
- **Modern JavaScript** (ES6+ modules)
- **Dynamic Content Loading** via API
- **User Authentication** with modals
- **Shopping Cart** integration
- **Product Search** and filtering
- **Category Navigation**
- **Real-time Notifications**

## Project Structure

```
techcart-ecommerce/
├── client/                 # Frontend files
│   ├── index.html         # Main HTML file
│   └── js/                # JavaScript modules
│       ├── main.js        # Main application logic
│       ├── api.js         # API communication
│       ├── auth.js        # Authentication management
│       ├── cart.js        # Cart functionality
│       └── ui.js          # UI utilities
├── server/                # Backend files
│   ├── server.js          # Main server file
│   ├── models/            # MongoDB models
│   │   ├── User.js        # User model
│   │   ├── Product.js     # Product model
│   │   ├── Category.js    # Category model
│   │   ├── Order.js       # Order model
│   │   ├── Cart.js        # Cart model
│   │   └── Wishlist.js    # Wishlist model
│   ├── routes/            # API routes
│   │   ├── auth.js        # Authentication routes
│   │   ├── products.js    # Product routes
│   │   ├── categories.js  # Category routes
│   │   ├── orders.js      # Order routes
│   │   ├── users.js       # User routes
│   │   ├── cart.js        # Cart routes
│   │   └── wishlist.js    # Wishlist routes
│   ├── middleware/        # Custom middleware
│   │   ├── auth.js        # Authentication middleware
│   │   ├── errorHandler.js # Error handling
│   │   ├── notFound.js    # 404 handler
│   │   └── validation.js  # Input validation
│   └── scripts/           # Utility scripts
│       └── seedData.js    # Database seeding
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── .env                   # Environment variables
└── README.md              # This file
```

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- Git

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd techcart-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Copy `.env.example` to `.env`
   - Update the environment variables:
     ```
     MONGODB_URI=mongodb://localhost:27017/techcart
     JWT_SECRET=your_jwt_secret_key_here
     JWT_EXPIRE=7d
     PORT=5000
     NODE_ENV=development
     CLIENT_URL=http://localhost:5173
     ```

4. **Start MongoDB**
   - Make sure MongoDB is running on your system
   - Default connection: `mongodb://localhost:27017/techcart`

5. **Seed the database** (optional)
   ```bash
   npm run seed
   ```

6. **Start the application**
   ```bash
   npm run dev
   ```

This will start both the backend server (port 5000) and frontend development server (port 5173).

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/logout` - User logout

### Products
- `GET /api/products` - Get all products (with filtering, sorting, pagination)
- `GET /api/products/:id` - Get single product
- `GET /api/products/featured/list` - Get featured products
- `GET /api/products/deals/list` - Get discounted products
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)
- `POST /api/products/:id/reviews` - Add product review

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:slug` - Get category by slug
- `POST /api/categories` - Create category (Admin only)
- `PUT /api/categories/:id` - Update category (Admin only)
- `DELETE /api/categories/:id` - Delete category (Admin only)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/items` - Add item to cart
- `PUT /api/cart/items/:productId` - Update cart item quantity
- `DELETE /api/cart/items/:productId` - Remove item from cart
- `DELETE /api/cart` - Clear cart

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order
- `GET /api/orders/track/:orderNumber` - Track order by order number
- `PUT /api/orders/:id/cancel` - Cancel order
- `PUT /api/orders/:id/status` - Update order status (Admin only)

### Wishlist
- `GET /api/wishlist` - Get user wishlist
- `POST /api/wishlist/:productId` - Add product to wishlist
- `DELETE /api/wishlist/:productId` - Remove product from wishlist

### Users
- `GET /api/users` - Get all users (Admin only)
- `POST /api/users/addresses` - Add user address
- `PUT /api/users/addresses/:addressId` - Update user address
- `DELETE /api/users/addresses/:addressId` - Delete user address

## Default Credentials

After running the seed script, you can use these credentials:

**Admin Account:**
- Email: `admin@techcart.com`
- Password: `admin123`

**Test User Account:**
- Email: `john@example.com`
- Password: `password123`

## Testing with Postman

1. **Import the API endpoints** into Postman
2. **Set up environment variables:**
   - `base_url`: `http://localhost:5000/api`
   - `token`: (will be set after login)

3. **Authentication Flow:**
   - Register or login to get a JWT token
   - Add the token to Authorization header: `Bearer <token>`

4. **Test the endpoints** following the API documentation above

## Development

### Running in Development Mode
```bash
npm run dev
```

This starts both the backend server with nodemon (auto-restart) and the frontend with Vite's dev server.

### Building for Production
```bash
npm run build
```

### Database Seeding
```bash
npm run seed
```

## Security Features

- **JWT Authentication** with secure token handling
- **Password Hashing** with bcryptjs
- **Input Validation** with Joi schemas
- **Rate Limiting** to prevent abuse
- **CORS Configuration** for cross-origin requests
- **Helmet** for security headers
- **Role-based Access Control** for admin features

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.