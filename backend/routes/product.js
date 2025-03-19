const express = require('express')
const router = express.Router()

const { 
  getProduct, 
  newProduct, 
  getSingleProduct, 
  updateProduct, 
  deleteProduct 
} = require('../controllers/productController')

const { isAuthenticatedUser } = require('../middlewares/auth')

router.route('/product').get(isAuthenticatedUser, getProduct)
router.route('/product/:id').get(getSingleProduct)

router.route('/admin/product/new').post(newProduct)

router.route('/admin/product/:id')
  .put(updateProduct)
  .delete(deleteProduct)

module.exports = router