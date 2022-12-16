import Stack from 'react-bootstrap/Stack';
import useGame from '../hooks/useGame';

const Remaining = () => {
	const { remaining } = useGame();
	return (
		<Stack gap={2} className='col-md-5 mx-auto'>
			<p>Remaining: {remaining}</p>
		</Stack>
	);
};

export default Remaining;
