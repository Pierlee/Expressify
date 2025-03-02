const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database'); // Import connection function
const Product = require('./models/productModel');

dotenv.config(); // Load environment variables

// Read JSON file
const rawData = fs.readFileSync('./data/products.json');
const jsonData = JSON.parse(rawData).products;

// Function to map JSON data to match Mongoose schema
const mapToProductModel = (sampleProduct) => ({
  name: sampleProduct.name,
  price: sampleProduct.price,
  description: sampleProduct.description,
  ratings: sampleProduct.ratings || 0,
  images: sampleProduct.images
    ? sampleProduct.images.map((img, index) => ({
        public_id: `image_${index}`,
        url: img.url,
      }))
    : [],
  category: sampleProduct.category,
  seller: sampleProduct.seller || 'Unknown Seller',
  stock: sampleProduct.stock || 0,
  numOfReviews: sampleProduct.numOfReviews || 0,
  reviews: sampleProduct.reviews
    ? sampleProduct.reviews.map((review) => ({
        name: review.name,
        rating: review.rating,
        comment: review.comment,
      }))
    : [],
  createdAt: new Date(sampleProduct.createdAt || Date.now()),
});

// Function to seed the database
const seedDatabase = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await connectDatabase(); // Uses the database connection function

    console.log('🗑️ Deleting existing products...');
    await Product.deleteMany(); // Clear the collection

    console.log('⏳ Inserting new products...');
    const formattedProducts = jsonData.map(mapToProductModel);
    await Product.insertMany(formattedProducts);

    console.log('✅ Database seeded successfully!');
    mongoose.disconnect();
  } catch (error) {
    console.error('❌ Seeding error:', error);
    mongoose.disconnect();
  }
};

// Run the script
seedDatabase();
