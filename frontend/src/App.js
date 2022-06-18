import Footer from './Components/Footer'
import Header from './Components/Header'
import { Container } from 'react-bootstrap'

const App = () => {
	return (
		<>
			<Header />
			<main>
				<Container className='py-3'>
					<h1>Welcome To our shop</h1>
				</Container>
			</main>
			<Footer />
		</>
	)
}

export default App
