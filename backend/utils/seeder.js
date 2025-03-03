const Product = require('../models/product');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database'); // Import connection function

const mongoose = require('mongoose');

dotenv.config({path: 'backend/config/config.env'}); // Load environment variables

const products = require('../data/product.json').products || []; 

console.log("📝 Sample product data:", products[0]); // ✅ Check first product

// Function to seed the database
const seedProducts = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await connectDatabase(); // Uses the database connection function

    console.log('🗑️ Deleting existing products...');
    await Product.deleteMany(); // Clear the collection

    console.log('⏳ Inserting new products...');
    await Product.insertMany(products);

    console.log('✅ Database seeded successfully!');
    mongoose.disconnect();
  } catch (error) {
    console.error('❌ Seeding error:', error);
    mongoose.disconnect();
  }
};

// Run the script
seedProducts();
