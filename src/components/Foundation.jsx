import useGame from '../hooks/useGame';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Stack from 'react-bootstrap/Stack';
import ButtonFoundation from './ButtonFoundation';

const Foundation = () => {
	const { foundation, playerOne, playerTwo } = useGame();
	// console.log(foundation);
	return (
		<Container>
			<Row className='mx-auto'>
				<div className='mx-auto row justify-content-center'>
					{foundation.map((card, index) => (
						<img
							key={index}
							src={
								card === null ? '' : card.image === undefined ? '' : card.image
							}
							alt={card.code}
							className='my-3 col-md-2 mx-auto col-4'
						/>
					))}
				</div>
			</Row>
			<Row className='mx-auto'>
				<Stack className='col-1 row justify-content-center'>
					<p className='text-center'>for {playerOne.name}</p>
				</Stack>
				<Stack className='col-1 row justify-content-center'>
					<p className='text-center'>for {playerTwo.name}</p>
				</Stack>
			</Row>
			<Row>
				<ButtonFoundation />
			</Row>
		</Container>
	);
};

export default Foundation;
