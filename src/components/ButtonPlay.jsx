import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import useGame from '../hooks/useGame';

const ButtonPlay = () => {
	const { requestCards } = useGame();
	const handleClick = () => {
		requestCards();
	};

	return (
		<Stack gap={2} className='col-md-5 mx-auto'>
			<Button onClick={handleClick} variant='secondary'>
				Play Cards
			</Button>
		</Stack>
	);
};

export default ButtonPlay;
