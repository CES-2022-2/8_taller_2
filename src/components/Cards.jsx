import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import useGame from '../hooks/useGame';

const Cards = () => {
	const { playerOne, playerTwo } = useGame();

	/*
	const removeCardOne = oldCard => {
		console.log('bye 1');
		// Reemplazando la carta del mazo con la que está en foundation
		updateCards(playerOne.cards, oldCard, foundation[0]);
		requestCard();
	};

	const removeCardTwo = oldCard => {
		console.log('bye 2');
		// Reemplazando la carta del mazo con la que está en foundation
		updateCards(playerTwo.cards, oldCard, foundation[0]);
		requestCard();
	}; */

	return (
		<Container>
			<Row>
				<h4>Player {playerOne.name}</h4>
				<p>Cards obtained</p>
				<div>
					{playerOne.cards.map((card, index) => (
						<img
							key={index}
							src={card.image}
							alt={card.code}
							className='col-md-1 mx-2 my-2'
						/>
					))}
				</div>
			</Row>
			<Row>
				<h4>Player {playerTwo.name}</h4>
				<p>Cards obtained</p>
				<div>
					{playerTwo.cards.map((card, index) => (
						<img
							key={index}
							src={card.image}
							alt={card.code}
							className='col-md-1 mx-2 my-2'
						/>
					))}
				</div>
			</Row>
		</Container>
	);
};

export default Cards;
