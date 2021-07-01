import React from 'react';
import styled from 'styled-components';

import ModalForm from './ModalForm';

const ModalWindow = ({ active, ...props }) => {
	const handleClick = () =>
		props.modifyMW(false, { name: '', description: '' });

	return (
		<Background className={active && 'active'} onClick={handleClick}>
			<ModalForm {...props} />
		</Background>
	);
};

const Background = styled.div`
	display: grid;
	place-items: center;
	position: fixed;
	width: 100vw;
	height: 100vh;
	top: 0;
	left: 0;
	background-color: #0005;
	z-index: 20;
	transform: scale(0);
	opacity: 0;
	transition: transform 0.2s ease-in, opacity 0.1s;

	&.active {
		transform: scale(1);
		opacity: 1;
	}
`;

export default ModalWindow;
