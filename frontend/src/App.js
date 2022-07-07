import Footer from './Components/Footer'
import Header from './Components/Header'
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/loginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'

const App = () => {
	return (
		<Router>
			<Header />
			<main>
				<Container className='py-3'>
					<Routes>
						<Route path='/' element={<HomeScreen />}></Route>
						<Route path='/login' element={<LoginScreen />}></Route>
						<Route path='/profile' element={<ProfileScreen />}></Route>
						<Route path='/register' element={<RegisterScreen />}></Route>
						<Route path='/product/:id' element={<ProductScreen />}></Route>
						<Route path='/cart/:id' element={<CartScreen />}></Route>
						<Route path='/cart' element={<CartScreen />}></Route>
					</Routes>
				</Container>
			</main>
			<Footer />
		</Router>
	)
}

export default App
