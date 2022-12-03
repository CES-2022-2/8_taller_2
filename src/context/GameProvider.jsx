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
	const [idGame, setIdGame] = useState(null);
	const [winName, setWinName] = useState('');
	const [showToast, setShowToast] = useState(false);

	const playGameId = async () => {
		setIdGame(await DeckOfCardsAPI.getDeckId());
	};

	const requestCards = async () => {
		const cards = await DeckOfCardsAPI.getCards(idGame);
		setPlayerOne({ ...playerOne, cards: [...playerOne.cards, cards[0]] });
		setPlayerTwo({ ...playerTwo, cards: [...playerTwo.cards, cards[1]] });

		const findCardPlayerOne = playerOne.cards.find(
			card => card.value === cards[0].value
		);

		const findCardPlayerTwo = playerTwo.cards.find(
			card => card.value === cards[1].value
		);

		if (findCardPlayerOne || findCardPlayerTwo) {
			setWinName(findCardPlayerOne ? playerOne.name : playerTwo.name);
			setShowToast(true);
		}
	};

	return (
		<GameContext.Provider
			value={{
				playerOne,
				setPlayerOne,
				playerTwo,
				setPlayerTwo,
				playGameId,
				requestCards,
				showToast,
				setShowToast,
				winName,
			}}
		>
			{children}
		</GameContext.Provider>
	);
};

export default GameProvider;
