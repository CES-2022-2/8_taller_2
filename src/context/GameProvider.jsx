import { useState } from 'react';
import DeckOfCardsAPI from '../services/deckofcardsapi';
import GameContext from './GameContext';

const GameProvider = ({ children }) => {
	const [playerOne, setPlayerOne] = useState({
		name: '',
		cards: [],
	});
	const [playerTwo, setPlayerTwo] = useState({
		name: '',
		cards: [],
	});

	const [foundation, setFoundation] = useState([]);
	const [idGame, setIdGame] = useState(null);
	const [winName, setWinName] = useState('');
	const [showToast, setShowToast] = useState(false);
	const [noCards, setNoCards] = useState(false);
	const [remaining, setRemaining] = useState(0);

	const playGameId = async () => {
		setIdGame(await DeckOfCardsAPI.getDeckId());
	};

	const remainingCards = async () => {
		setRemaining(await DeckOfCardsAPI.getRemaining(idGame));
	};

	// Asignando los mazos a los jugadores
	const starterCards = async () => {
		const start1 = await DeckOfCardsAPI.getStarterCards(idGame);
		setPlayerOne({
			...playerOne,
			cards: start1,
		});
		const start2 = await DeckOfCardsAPI.getStarterCards(idGame);
		setPlayerTwo({
			...playerTwo,
			cards: start2,
		});
		remainingCards();
	};

	// Actualizando el mazo de los jugadores
	const updateCards = async (deck, oldCard, newCard) => {
		remainingCards();
		if (remaining <= 2) {
			setNoCards(true);
		}
		// Buscar la carta antigua en el mazo
		const oldCardId = deck.findIndex(card => {
			return card === oldCard;
		});
		// Eliminar la carta antigua del mazo
		deck.splice(oldCardId, 1, newCard);
	};

	// Hallar terna terna cuarta
	const ttCuarta = async player => {
		const isCuarta = await cuarta(player.cards);
		console.log(isCuarta);
		const isTerna = await terna(player.cards);
		console.log(isTerna);

		// Comprobando si es el ganador
		if (isCuarta && isTerna) {
			setWinName(player.name);
			setShowToast(true);
		}
	};

	// Para traer filtros de las cartas
	const cardFilter = cards => {
		const suitTypes = cards
			.map(card => card.suit) // trayendo todos los tipos de palo de cartas
			.filter((suitType, index, array) => array.indexOf(suitType) === index); // quitar duplicados

		const suitCount = suitTypes.map(suitType => ({
			suit: suitType,
			amount: cards.filter(card => card.suit === suitType).length,
			cards: cards.filter(card => card.suit === suitType),
		}));

		// Trayendo todos los tipos de valores de cartas
		const valueTypes = cards
			.map(card => card.value) // trayendo todos los tipos de valores de cartas
			.filter((valueType, index, array) => array.indexOf(valueType) === index); // quitar duplicados

		const valueCount = valueTypes.map(valueType => ({
			value: valueType,
			amount: cards.filter(card => card.value === valueType).length,
			cards: cards.filter(card => card.value === valueType),
		}));

		return [suitCount, valueCount];
	};

	const cuarta = async (cards, isCuarta) => {
		// Trayendo todos los tipos de palo de cartas

		const filter = cardFilter(cards);

		const suitCount = filter[1];
		const valueCount = filter[1];

		// Agrupando los valores de la misma cantidad que sean iguales a 4 (PARA LA CUARTA)
		const fourValues = valueCount.filter(valueC => valueC.amount === 4);
		// console.log(fourValues);

		// Agrupando los palos del mismo tipo que sean mayores a 4 (PARA LA ESCALERA)
		const fourSuits = suitCount.filter(suitC => suitC.amount === 4);
		// console.log(fourSuits);

		// Validar si las cartas son iguales o forman escalera
		// Trayendo las cartas
		const fourCards = cards.filter(card =>
			fourSuits.find(({ suit }) => card.suit === suit)
		);

		console.log(fourCards);

		if (fourValues.length === 1) {
			// Si hay 4 iguales
			return true;
		} else {
			return false;
		}
	};

	const terna = async cards => {
		const filter = cardFilter(cards);

		const valueCount = filter[1];
		// console.log(valueCount);

		// Agrupando los valores de la misma cantidad que sean iguales a 3
		const threeValues = valueCount.filter(valueC => valueC.amount === 3);
		// console.log(threeValues);

		if (threeValues.length === 2) {
			return true;
		} else {
			return false;
		}
	};

	// Para analizar si se conserva o descarta una carta
	const analizeHands = async (player, foundation) => {
		console.log('analizando mazo del jugador ' + player.name);

		// Llamando los filtros de cartas
		const filter = cardFilter(player.cards);
		console.log(filter);

		// Traer las cartas solas
		const singleCards = filter[1].filter(valueC => valueC.amount === 1);
		console.log('singleCards');
		console.log(singleCards);
		// Si no hay cartas solas, excluir las que tengan el mismo tipo de la nueva carta
		if (singleCards.length === 0) {
			console.log('Cayó en el if');

			// Excluir las ternas y cuartas
			const pairedCards = filter[1].filter(valueC => valueC.amount < 3);

			console.log('pairedCards');
			console.log(pairedCards);
			console.log('Foundation');
			console.log(foundation.value);

			// Descartar las cartas con el mismo tipo
			const typeCards = pairedCards.filter(
				card => card.value !== foundation.value
			);
			console.log('typeCards');
			console.log(typeCards);
			// Si no hay cartas del mismo tipo, excluir
			if (typeCards.length !== pairedCards.length) {
				// Elegir una del grupo restante al azar
				const cardLeft =
					typeCards[Math.floor(Math.random() * typeCards.length)];
				console.log('Card Left');
				console.log(
					cardLeft.cards[Math.floor(Math.random() * cardLeft.cards.length)]
				);
				// Conservando la carta antigua, es decir la carta a reemplazar
				const oldCard =
					cardLeft.cards[Math.floor(Math.random() * cardLeft.cards.length)];
				console.log('Old card');
				console.log(oldCard);
				updateCards(player.cards, oldCard, foundation);
			}
		} else {
			// Si hay cartas solas
			// Descartar cartas del mismo valor
			console.log('Foundation');
			console.log(foundation.value);
			const typeCards = singleCards.filter(
				card => card.value !== foundation.value
			);
			console.log('cayo en el else');
			console.log(typeCards);
			// Elegir una carta al azar de las restantes
			const cardLeft = typeCards[Math.floor(Math.random() * typeCards.length)];
			// Conservando la carta antigua, es decir la carta a reemplazar
			const oldCard = cardLeft.cards[0];
			console.log('Old card');
			console.log(oldCard);
			// Reemplazando la carta en la baraja
			updateCards(player.cards, oldCard, foundation);
		}
	};

	const requestCard = async () => {
		/* if (remaining === 0) {
			setNoCards(true);
		} */
		const cards = await DeckOfCardsAPI.getCards(idGame);
		setFoundation(cards);

		// Analizar si se conservan las cartas o se descartan
		analizeHands(playerOne, foundation[0]);
		analizeHands(playerTwo, foundation[1]);

		// Comprobar si hay terna terna cuarta
		ttCuarta(playerOne);
		ttCuarta(playerTwo);
		remainingCards();
	};

	return (
		<GameContext.Provider
			value={{
				starterCards,
				remaining,
				remainingCards,
				playerOne,
				setPlayerOne,
				playerTwo,
				setPlayerTwo,
				playGameId,
				showToast,
				setShowToast,
				winName,
				requestCard,
				foundation,
				idGame,
				updateCards,
				noCards,
				setNoCards,
			}}
		>
			{children}
		</GameContext.Provider>
	);
};

export default GameProvider;
