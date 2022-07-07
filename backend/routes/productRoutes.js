import express from 'express'
const router = express.Router()

import { addProduct, addProducts } from '../controllers/productController.js'

router.route('/').get(addProducts)
router.route('/:id').get(addProduct)
export default router
