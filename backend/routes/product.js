const express = require('express')
const router = express.Router()

const { 
  getProduct, 
  newProduct, 
  getSingleProduct, 
  updateProduct, 
  deleteProduct 
} = require('../controllers/productController')

router.route('/product').get(getProduct)
router.route('/product/:id').get(getSingleProduct)

router.route('/admin/product/new').post(newProduct)

router.route('/admin/product/:id')
  .put(updateProduct)
  .delete(deleteProduct)

module.exports = router