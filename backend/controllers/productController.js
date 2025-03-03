const Product = require('../models/product')

// Create new product => /api/v1/product/new
exports.newProduct = async (req, res, next) => {
  const product = await Product.create(req.body)

  res.status(201).json({
    success: true,
    product
  })
}

// Get all products => /api/v1/product
exports.getProduct = async (req, res, next) => {

  const product = await Product.find()

  res.status(200).json({
    success: true,
    count: product.length,
    product
  })
}