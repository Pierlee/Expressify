const express = require('express')
const router = express.Router()

const { getProduct, newProduct, getSingleProduct } = require('../controllers/productController')

router.route('/product').get(getProduct)
router.route('/product/:id').get(getSingleProduct)

router.route('/product/new').post(newProduct)

module.exports = router