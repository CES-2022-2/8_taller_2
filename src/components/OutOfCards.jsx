import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import useGame from '../hooks/useGame';
import { TfiGame } from 'react-icons/tfi';

const OutOfCards = () => {
	const { noCards, setNoCards } = useGame();
	return (
		<ToastContainer className='p-3' position='top-center'>
			<Toast onClose={() => setNoCards(true)} show={noCards}>
				<Toast.Header>
					<TfiGame />
					<strong className='me-auto'>Deck Of Cards</strong>
					<small>Out of Cards!</small>
				</Toast.Header>
				<Toast.Body>You have no cards left!</Toast.Body>
			</Toast>
		</ToastContainer>
	);
};

export default OutOfCards;
