const getDeckId = async () => {
	const url = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=2';
	const res = await fetch(url);
	const data = await res.json();
	return data?.deck_id;
};

const getCards = async deckId => {
	const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`;
	const res = await fetch(url);
	const data = await res.json();
	return data?.cards;
};

const getStarterCards = async deckId => {
	const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=10`;
	const res = await fetch(url);
	const data = await res.json();
	return data?.cards;
};

const getRemaining = async deckId => {
	const url = `https://deckofcardsapi.com/api/deck/${deckId}/shuffle/?remaining=true`;
	const res = await fetch(url);
	const data = await res.json();
	return data?.remaining;
};

const DeckOfCardsAPI = {
	getDeckId,
	getCards,
	getStarterCards,
	getRemaining,
};

export default DeckOfCardsAPI;
