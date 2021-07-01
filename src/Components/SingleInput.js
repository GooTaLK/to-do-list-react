import React from 'react';
import styled from 'styled-components';
import { BiSend } from 'react-icons/bi';

const SingleInput = ({ modifyMW }) => {
	const handleSubmit = (e) => {
		e.preventDefault();
		modifyMW(true, {
			name: e.target.text_input.value,
			submitValue: 'Agregar',
			process: 'add',
		});
		e.target.text_input.value = '';
	};

	return (
		<StickyForm className="main__input" onSubmit={handleSubmit}>
			<TextInput name="text_input" placeholder="Agregar tarea..." />
			<SubmitBtn name="submit" type="submit">
				<SendSVG />
			</SubmitBtn>
		</StickyForm>
	);
};

const StickyForm = styled.form`
	/* position: sticky; */
	top: calc(15vh - 2rem);
	background-color: #eeeeee80;
	padding-bottom: 1rem;
	padding-right: 2rem;
	width: 100%;
	text-align: center;
	z-index: 9;

	@media (min-width: 1040px) {
		padding-right: 12rem;
	}
`;

const TextInput = styled.input`
	line-height: 1.5rem;
	font-size: 1rem;
	margin-top: 3rem;
	background-color: transparent;
	padding: 0.5rem;
	border: none;
	border-bottom: 1px solid #000;
	outline: none;

	@media (min-width: 680px) {
		font-size: 1.2rem;
	}
`;

const SubmitBtn = styled.button`
	background-color: transparent;
	padding: 0;
	border: none;

	&:focus {
		animation: clicked_btn 1s;
	}

	@keyframes clicked_btn {
		55% {
			transform: translateX(2rem);
		}
	}
`;

const SendSVG = styled(BiSend)`
	font-size: 1.4rem;
	color: #444;
	padding: 2px;
	transform: translateY(0.8rem);
	cursor: pointer;

	&:hover {
		color: #e54;
	}

	@media (min-width: 680px) {
		font-size: 1.8rem;
	}
`;

export default SingleInput;
