import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import FormContainer from '../Components/FormContainer'
import { getUserDetails, updateUser } from '../actions/userActions'

const UserEditScreen = () => {
	const [email, setEmail] = useState('')
	const [isAdmin, setIsAdmin] = useState(false)

	const [name, setName] = useState('')
	const naviagte = useNavigate()
	const dispatch = useDispatch()
	const userDetails = useSelector((state) => state.userDetails)
	const { loading, error, user } = userDetails
	const userUpdate = useSelector((state) => state.userUpdate)
	const { loading: loadingUpdate, error: errorUpdate, success } = userUpdate
	const params = useParams()
	const userId = params.id

	useEffect(() => {
		if (success) {
			dispatch({ type: 'USER_UPDATE_RESET' })
			naviagte('/admin/userlist')
		} else {
			if (!user.name || user._id !== userId) {
				dispatch(getUserDetails(userId))
			} else {
				setName(user.name)
				setEmail(user.email)
				setIsAdmin(user.isAdmin)
			}
		}
	}, [user, userId, dispatch, success, naviagte])

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(updateUser({ _id: userId, name, email, isAdmin }))
	}

	return (
		<>
			<Link to='/admin/userList' className='btn btn-light my-3'>
				Go Back
			</Link>
			<FormContainer>
				<h1>Edit User</h1>
				{loadingUpdate && <Loader />}
				{errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant='danger'>{error}</Message>
				) : (
					<Form onSubmit={submitHandler}>
						<Form.Group controlId='name'>
							<Form.Label>NAME</Form.Label>
							<Form.Control
								type='name'
								placeholder='Enter name'
								value={name}
								onChange={(e) => setName(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='email'>
							<Form.Label>Email Address</Form.Label>
							<Form.Control
								type='email'
								placeholder='Enter email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='isadmin'>
							<Form.Check
								type='checkbox'
								label='is Admin'
								checked={isAdmin}
								onChange={(e) => setIsAdmin(e.target.checked)}
							></Form.Check>
						</Form.Group>

						<Button type='submit' variant='primary'>
							update
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	)
}

export default UserEditScreen