import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonPlay from '../components/ButtonPlay';
import Cards from '../components/Cards';
import ToastWinner from '../components/ToastWinner';
import Foundation from '../components/Foundation';
import OutOfCards from '../components/outOfCards';

const GamePage = () => {
	return (
		<Container className='my-4'>
			<Row>
				<Col xs={16} md={16}>
					<ButtonPlay />
					<Foundation />
				</Col>
				<Col xs={16} md={16}>
					<Cards />
				</Col>
			</Row>
			<Row>
				<Col>
					<ToastWinner />
					<OutOfCards />
				</Col>
			</Row>
		</Container>
	);
};

export default GamePage;
