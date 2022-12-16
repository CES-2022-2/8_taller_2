import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import useGame from '../hooks/useGame';
import Remaining from './Remaining';

const ButtonPlay = () => {
	const { requestCard, starterCards, remainingCards } = useGame();
	const handleClick = () => {
		starterCards();
		remainingCards();
		requestCard();
		setShow(false);
	};

	const [show, setShow] = useState(true);

	return (
		<Stack gap={2} className='col-md-5 mx-auto'>
			<Button
				onClick={handleClick}
				style={{ display: show ? 'block' : 'none' }}
				variant='secondary'
			>
				New Deck
			</Button>
			<Remaining />
		</Stack>
	);
};

export default ButtonPlay;
