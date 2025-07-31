import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Category from '../models/Category.js';
import Product from '../models/Product.js';

dotenv.config();

const categories = [
  {
    name: 'Processors',
    description: 'CPU processors from AMD and Intel',
    icon: { url: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg', alt: 'Processor icon' }
  },
  {
    name: 'Graphics Cards',
    description: 'High-performance graphics cards for gaming and professional work',
    icon: { url: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg', alt: 'Graphics card icon' }
  },
  {
    name: 'Motherboards',
    description: 'Motherboards for various CPU sockets',
    icon: { url: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg', alt: 'Motherboard icon' }
  },
  {
    name: 'RAM',
    description: 'Memory modules for desktop and laptop computers',
    icon: { url: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg', alt: 'RAM icon' }
  },
  {
    name: 'Storage',
    description: 'SSDs, HDDs, and storage solutions',
    icon: { url: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg', alt: 'Storage icon' }
  },
  {
    name: 'Power Supply',
    description: 'PSUs for desktop computers',
    icon: { url: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg', alt: 'PSU icon' }
  },
  {
    name: 'Laptops',
    description: 'Laptops for work, gaming, and everyday use',
    icon: { url: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg', alt: 'Laptop icon' }
  },
  {
    name: 'Smartphones',
    description: 'Latest smartphones and mobile devices',
    icon: { url: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg', alt: 'Smartphone icon' }
  },
  {
    name: 'Gaming',
    description: 'Gaming accessories and peripherals',
    icon: { url: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg', alt: 'Gaming icon' }
  },
  {
    name: 'Accessories',
    description: 'Computer accessories and peripherals',
    icon: { url: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg', alt: 'Accessories icon' }
  }
];

const products = [
  {
    name: 'AMD Ryzen 9 5900X',
    description: 'High-performance 12-core, 24-thread processor for gaming and content creation',
    shortDescription: '12-core, 24-thread processor with 3.7GHz base clock',
    price: 38999,
    originalPrice: 45990,
    discount: 15,
    brand: 'AMD',
    model: '5900X',
    sku: 'AMD-5900X-001',
    images: [
      { url: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg', alt: 'AMD Ryzen 9 5900X', isPrimary: true }
    ],
    specifications: [
      { key: 'Cores', value: '12' },
      { key: 'Threads', value: '24' },
      { key: 'Base Clock', value: '3.7 GHz' },
      { key: 'Boost Clock', value: '4.8 GHz' },
      { key: 'Socket', value: 'AM4' }
    ],
    stock: 25,
    weight: 0.1,
    isActive: true,
    isFeatured: true,
    tags: ['processor', 'amd', 'ryzen', 'gaming', 'high-performance'],
    freeShipping: true,
    warranty: { duration: 3, unit: 'years', description: 'Manufacturer warranty' }
  },
  {
    name: 'NVIDIA GeForce RTX 3080',
    description: 'Powerful graphics card for 4K gaming and ray tracing',
    shortDescription: 'High-end graphics card with 10GB GDDR6X memory',
    price: 71999,
    originalPrice: 79990,
    discount: 10,
    brand: 'NVIDIA',
    model: 'RTX 3080',
    sku: 'NV-RTX3080-001',
    images: [
      { url: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg', alt: 'NVIDIA GeForce RTX 3080', isPrimary: true }
    ],
    specifications: [
      { key: 'Memory', value: '10GB GDDR6X' },
      { key: 'Memory Interface', value: '320-bit' },
      { key: 'Base Clock', value: '1440 MHz' },
      { key: 'Boost Clock', value: '1710 MHz' },
      { key: 'CUDA Cores', value: '8704' }
    ],
    stock: 15,
    weight: 1.5,
    isActive: true,
    isFeatured: true,
    tags: ['graphics-card', 'nvidia', 'rtx', 'gaming', '4k'],
    freeShipping: true,
    warranty: { duration: 2, unit: 'years', description: 'Manufacturer warranty' }
  },
  {
    name: 'Samsung 980 Pro 1TB SSD',
    description: 'High-speed NVMe SSD for fast boot times and file transfers',
    shortDescription: 'PCIe 4.0 NVMe SSD with 1TB capacity',
    price: 9999,
    originalPrice: 12500,
    discount: 20,
    brand: 'Samsung',
    model: '980 Pro',
    sku: 'SAM-980PRO-1TB',
    images: [
      { url: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg', alt: 'Samsung 980 Pro SSD', isPrimary: true }
    ],
    specifications: [
      { key: 'Capacity', value: '1TB' },
      { key: 'Interface', value: 'PCIe 4.0 NVMe' },
      { key: 'Sequential Read', value: '7,000 MB/s' },
      { key: 'Sequential Write', value: '5,000 MB/s' },
      { key: 'Form Factor', value: 'M.2 2280' }
    ],
    stock: 50,
    weight: 0.01,
    isActive: true,
    isFeatured: true,
    tags: ['ssd', 'storage', 'nvme', 'samsung', 'fast'],
    freeShipping: true,
    warranty: { duration: 5, unit: 'years', description: 'Manufacturer warranty' }
  },
  {
    name: 'Intel Core i9-12900K',
    description: 'Latest generation Intel processor with hybrid architecture',
    shortDescription: '16-core processor with P-cores and E-cores',
    price: 44999,
    originalPrice: 49990,
    discount: 10,
    brand: 'Intel',
    model: 'i9-12900K',
    sku: 'INT-12900K-001',
    images: [
      { url: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg', alt: 'Intel Core i9-12900K', isPrimary: true }
    ],
    specifications: [
      { key: 'Cores', value: '16 (8P+8E)' },
      { key: 'Threads', value: '24' },
      { key: 'Base Clock', value: '3.2 GHz' },
      { key: 'Boost Clock', value: '5.2 GHz' },
      { key: 'Socket', value: 'LGA1700' }
    ],
    stock: 20,
    weight: 0.1,
    isActive: true,
    isFeatured: false,
    tags: ['processor', 'intel', 'core-i9', 'gaming', 'high-performance'],
    freeShipping: true,
    warranty: { duration: 3, unit: 'years', description: 'Manufacturer warranty' }
  }
];

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const adminUser = await User.create({
      fullName: 'Admin User',
      email: 'admin@techcart.com',
      password: 'admin123',
      role: 'admin',
      isEmailVerified: true
    });
    console.log('Created admin user');

    // Create test user
    const testUser = await User.create({
      fullName: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      phone: '+91 98765 43210',
      isEmailVerified: true
    });
    console.log('Created test user');

    // Create categories
    const createdCategories = await Category.insertMany(categories);
    console.log('Created categories');

    // Create products with category references
    const productsWithCategories = products.map((product, index) => ({
      ...product,
      category: createdCategories[index % createdCategories.length]._id
    }));

    await Product.insertMany(productsWithCategories);
    console.log('Created products');

    console.log('✅ Seed data created successfully!');
    console.log('Admin credentials: admin@techcart.com / admin123');
    console.log('Test user credentials: john@example.com / password123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();