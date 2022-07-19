import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
	Row,
	Col,
	ListGroup,
	Image,
	Card,
	ListGroupItem,
	Button,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import {
	getOrderDetails,
	payOrder,
	deliverOrder,
} from '../actions/orderActions'
import { useParams } from 'react-router-dom'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import axios from 'axios'
const OrderScreen = () => {
	const dispatch = useDispatch()
	const [pclientId, setPclientId] = useState(null)
	const params = useParams()
	const orderId = params.id
	const orderDetails = useSelector((state) => state.orderDetails)
	const { order, loading, error } = orderDetails
	const orderPay = useSelector((state) => state.orderPay)
	const { loading: loadingPay, success: successPay } = orderPay
	const orderDeliver = useSelector((state) => state.orderDeliver)
	const { loading: loadingDeliver, success: successDeliver } = orderDeliver
	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin
	let itemsPrice

	if (!loading) {
		itemsPrice = Number(
			order.orderItems
				.reduce((acc, item) => acc + item.price * item.qty, 0)
				.toFixed(2)
		)
	}

	useEffect(() => {
		const addPayPalScript = async () => {
			const { data: clientId } = await axios.get('/api/config/paypal')
			setPclientId(clientId)
		}
		if (!order || order._id !== orderId || successPay || successDeliver) {
			dispatch({ type: 'ORDER_PAY_RESET' })
			dispatch({ type: 'ORDER_DELIVER_RESET' })
			dispatch(getOrderDetails(orderId))
		} else {
			addPayPalScript()
		}
	}, [dispatch, order, orderId, successPay, successDeliver])
	const deliverHandler = () => {
		dispatch(deliverOrder(order))
	}
	return loading ? (
		<Loader />
	) : error ? (
		<Message variant='danger'>{error}</Message>
	) : (
		<>
			<h1>Order {orderId}</h1>
			<Row>
				<Col md={8}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>Name: </strong>
								{order.user.name}
							</p>
							<p>
								<strong>Email: </strong>
								<a href={`mailto:${order.user.email}`}>{order.user.email}</a>
							</p>
							<p>
								<strong>Address:</strong>
								{order.shippingAddress.address}, {order.shippingAddress.city}{' '}
								{order.shippingAddress.postalCode},{' '}
								{order.shippingAddress.country}
							</p>
							{order.isDelivered ? (
								<Message variant='success'>
									Delivered on {order.deliveredAt}
								</Message>
							) : (
								<Message variant='danger'>Not Delivered</Message>
							)}
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Payment Method</h2>
							<p>
								<strong>Method: </strong>
								{order.paymentMethod}
							</p>
							{order.isPaid ? (
								<Message variant='success'>Paid on {order.paidAt}</Message>
							) : (
								<Message variant='danger'>Not Paid</Message>
							)}
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Order Items</h2>
							{order.orderItems.length === 0 ? (
								<Message>Order is empty</Message>
							) : (
								<ListGroup variant='flush'>
									{order.orderItems.map((item, index) => (
										<ListGroup.Item key={index}>
											<Row>
												<Col md={1}>
													<Image
														src={item.image}
														alt={item.name}
														fluid
														rounded
													/>
												</Col>
												<Col>
													<Link to={`/product/${item.product}`}>
														{item.name}
													</Link>
												</Col>
												<Col md={4}>
													{item.qty} x ${item.price} = ${item.qty * item.price}
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h2>Order Summary</h2>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Items</Col>
									<Col>${itemsPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Shipping</Col>
									<Col>${order.shippingPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Tax</Col>
									<Col>${order.taxPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Total</Col>
									<Col>${order.totalPrice}</Col>
								</Row>
							</ListGroup.Item>
							{!order.isPaid && (
								<ListGroupItem>
									{loadingPay ? (
										<Loader />
									) : typeof pclientId === 'string' ? (
										<PayPalScriptProvider
											options={{
												'client-id': `${pclientId}`,
											}}
										>
											<PayPalButtons
												createOrder={(data, actions) => {
													return actions.order.create({
														purchase_units: [
															{
																amount: {
																	value: order.totalPrice,
																},
															},
														],
													})
												}}
												onApprove={(data, actions) => {
													return actions.order.capture().then((details) => {
														dispatch(payOrder(orderId, details))
														alert(
															'Transaction completed by ' +
																details.payer.name.given_name
														)
													})
												}}
											/>
										</PayPalScriptProvider>
									) : (
										<h1>waiting</h1>
									)}
								</ListGroupItem>
							)}
							{loadingDeliver && <Loader />}
							{userInfo &&
								userInfo.isAdmin &&
								order.isPaid &&
								!order.isDelivered && (
									<ListGroupItem>
										<Button
											type='button'
											className='btn btn-block'
											onClick={deliverHandler}
										>
											Mark As Delivered
										</Button>
									</ListGroupItem>
								)}
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	)
}
export default OrderScreen
