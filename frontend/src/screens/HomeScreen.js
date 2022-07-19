import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from '../Components/Product'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import { useParams } from 'react-router-dom'
import Paginate from '../Components/Paginate'
import ProductCarousel from '../Components/ProductCarousel'
import Meta from '../Components/Meta'
import { Link } from 'react-router-dom'
const HomeScreen = () => {
	const params = useParams()
	const dispatch = useDispatch()
	const productList = useSelector((state) => state.productList)
	const { error, loading, products, page, pages } = productList
	const keyword = params.keyword
	const pageNumber = params.pageNumber || 1
	useEffect(() => {
		dispatch(listProducts(keyword, pageNumber))
	}, [dispatch, keyword, pageNumber])

	return (
		<>
			<Meta
				title='Welcome to Proshop'
				description='buy some goodies'
				keywords='electronics, buy electronics'
			/>

			{!keyword ? (
				<ProductCarousel />
			) : (
				<Link to='/' className='btn btn-light'>
					go Back
				</Link>
			)}
			<h1>Latest Products</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<>
					<Row>
						{products.map((product) => (
							<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
								<Product product={product} />
							</Col>
						))}
					</Row>
					<Paginate
						pages={pages}
						page={page}
						keyword={keyword ? keyword : ''}
					/>
				</>
			)}
		</>
	)
}

export default HomeScreen
