import express from 'express'
const router = express.Router()
import { protect, admin } from '../middleware/authMiddleware.js'
import {
	addProduct,
	addProducts,
	createProduct,
	createProductReview,
	deleteProduct,
	getTopProducts,
	updateProduct,
} from '../controllers/productController.js'

router.route('/').get(addProducts).post(protect, admin, createProduct)
router.route('/:id/reviews').post(protect, createProductReview)
router.get('/top', getTopProducts)
router
	.route('/:id')
	.get(addProduct)
	.delete(protect, admin, deleteProduct)
	.put(protect, admin, updateProduct)
export default router
