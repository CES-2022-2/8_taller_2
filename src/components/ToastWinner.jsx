import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import useGame from '../hooks/useGame';
import { TfiGame } from 'react-icons/tfi';

const ToastWinner = () => {
	const { showToast, setShowToast, winName } = useGame();
	return (
		<ToastContainer className='p-3' position='top-center'>
			<Toast onClose={() => setShowToast(false)} show={showToast}>
				<Toast.Header>
					<TfiGame />
					<strong className='me-auto'>Deck Of Cards</strong>
					<small>Winner</small>
				</Toast.Header>
				<Toast.Body>Player {winName}</Toast.Body>
			</Toast>
		</ToastContainer>
	);
};

export default ToastWinner;
