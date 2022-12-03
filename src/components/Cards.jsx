import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import useGame from '../hooks/useGame';

const Cards = () => {
	const { playerOne, playerTwo } = useGame();
	return (
		<Container>
			<Row>
				<Col>
					<div className='align-items-center my-2'>
						<h4>Player {playerOne.name}</h4>
						<p>Cards obtained</p>
						{playerOne.cards.map((card, index) => (
							<img
								key={index}
								src={card.image}
								alt={card.code}
								className='col-sm-4 col-lg-3 my-2 mx-2'
							/>
						))}
					</div>
				</Col>
				<Col>
					<div className='align-items-center my-2'>
						<h4>Player {playerTwo.name}</h4>
						<p>Cards obtained</p>
						{playerTwo.cards.map((card, index) => (
							<img
								key={index}
								src={card.image}
								alt={card.code}
								className='col-sm-4 col-lg-3 my-2 mx-2'
							/>
						))}
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default Cards;
