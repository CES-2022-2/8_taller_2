import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormLogin from '../components/FormLogin';

const HomePage = () => {
	return (
		<Container className='my-4'>
			<Row>
				<Col>
					<FormLogin />
				</Col>
			</Row>
		</Container>
	);
};

export default HomePage;
