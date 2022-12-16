import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import useGame from '../hooks/useGame';

const ButtonFoundation = () => {
	const { requestCard, noCards, showToast } = useGame();

	const handleClick = () => {
		requestCard();
	};

	return (
		<Stack gap={2} className='col-md-5 mx-auto'>
			<Button
				onClick={
					showToast === true
						? console.log('Game is already over!')
						: noCards === false && showToast === false
						? handleClick
						: console.log('No cards left')
				}
				variant='secondary'
			>
				Get Cards
			</Button>
		</Stack>
	);
};

export default ButtonFoundation;
