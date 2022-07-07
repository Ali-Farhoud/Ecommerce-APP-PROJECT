import React, { useState, useEffect } from 'react'
import {
	Button,
	Card,
	Col,
	Form,
	Image,
	ListGroup,
	ListGroupItem,
	Row,
} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Rating from '../Components/Rating'

import Loader from '../Components/Loader'
import Message from '../Components/Message'
import { listProductDetails } from '../actions/productActions'
const ProductScreen = () => {
	const [qty, setQty] = useState(1)
	const dispatch = useDispatch()
	const params = useParams()
	const productDetails = useSelector((state) => state.productDetails)
	const { error, loading, product } = productDetails
	let navigate = useNavigate()
	useEffect(() => {
		dispatch(listProductDetails(params.id))
	}, [params, dispatch])
	const addToCartHandler = () => {
		navigate(`/cart/${params.id}?qty=${qty}`)
	}
	return (
		<>
			<Link className='btn btn-dark my-3 ' to='/'>
				Go Back
			</Link>

			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Row>
					<Col md={6}>
						<Image src={product.image} alt={product.name} fluid />
					</Col>
					<Col md={3}>
						<ListGroup variant='flush'>
							<ListGroupItem>
								<h3>{product.name}</h3>
							</ListGroupItem>
							<ListGroupItem>
								<Rating
									value={product.rating}
									text={`${product.numReviews} Reviews`}
								/>
							</ListGroupItem>
							<ListGroupItem>Price: ${product.price}</ListGroupItem>
							<ListGroupItem>Description: ${product.description}</ListGroupItem>
						</ListGroup>
					</Col>
					<Col md={3}>
						<Card>
							<ListGroup variant='flush'>
								<ListGroupItem>
									<Row>
										<Col>Price:</Col>
										<Col>
											<strong>${product.price}</strong>
										</Col>
									</Row>
								</ListGroupItem>
								<ListGroupItem>
									<Row>
										<Col>Status:</Col>
										<Col>
											{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
										</Col>
									</Row>
								</ListGroupItem>
								{product.countInStock > 0 && (
									<ListGroupItem>
										<Row>
											<Col>Qty</Col>
											<Col>
												<Form.Control
													as='select'
													value={qty}
													onChange={(e) => setQty(e.target.value)}
												>
													{[...Array(product.countInStock).keys()].map((x) => (
														<option key={x + 1} value={x + 1}>
															{x + 1}
														</option>
													))}
												</Form.Control>
											</Col>
										</Row>
									</ListGroupItem>
								)}
								<ListGroupItem>
									<Col>
										<Button
											onClick={addToCartHandler}
											className='  btn-dark w-100'
											type='button'
											disabled={product.countInStock === 0}
										>
											Add To Cart
										</Button>
									</Col>
								</ListGroupItem>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			)}
		</>
	)
}

export default ProductScreen
