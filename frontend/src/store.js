import { configureStore } from '@reduxjs/toolkit'
import { cartReducer } from './reducers/cartReducers'
import {
	productListReducer,
	productDetailsReducer,
	productDeleteReducer,
	productCreateReducer,
	productUpdateReducer,
	productCreateReviewReducer,
	productTopRatedReducer,
} from './reducers/productReducers'
import {
	userLoginReducer,
	userRegisterReducer,
	userDetailsReducer,
	userUpdateProfileReducer,
	userListReducer,
	userDeleteReducer,
	userUpdateReducer,
} from './reducers/userReducers'
import {
	orderCreateReducer,
	orderDetailsReducer,
	orderPayReducer,
	orderListMyReducer,
	orderListReducer,
	orderDeliverReducer,
} from './reducers/orderReducers'
const cartItemsFromStorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: []
const userInfoFromStorage = localStorage.getItem('userinfo')
	? JSON.parse(localStorage.getItem('userinfo'))
	: null
const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
	? JSON.parse(localStorage.getItem('shippingAddress'))
	: {}
const initialState = {
	cart: {
		cartItems: cartItemsFromStorage,
		shippingAddress: shippingAddressFromStorage,
	},
	userLogin: { userInfo: userInfoFromStorage },
}

const store = configureStore({
	reducer: {
		productList: productListReducer,
		productDetails: productDetailsReducer,
		productDelete: productDeleteReducer,
		productCreate: productCreateReducer,
		productUpdate: productUpdateReducer,
		productReviewCreate: productCreateReviewReducer,
		productTopRated: productTopRatedReducer,
		cart: cartReducer,
		userLogin: userLoginReducer,
		userRegister: userRegisterReducer,
		userDetails: userDetailsReducer,
		userUpdateProfile: userUpdateProfileReducer,
		userList: userListReducer,
		userDelete: userDeleteReducer,
		userUpdate: userUpdateReducer,
		orderCreate: orderCreateReducer,
		orderDetails: orderDetailsReducer,
		orderPay: orderPayReducer,
		orderDeliver: orderDeliverReducer,
		orderList: orderListReducer,
		orderListMy: orderListMyReducer,
	},

	preloadedState: initialState,
})

export default store
