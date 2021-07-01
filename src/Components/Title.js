import React from 'react';
import styled from 'styled-components';

const Title = ({ color, scale, mediaQuery }) => {
	return (
		<TitleSpan
			color={color || 'rgb(244, 98, 0)'}
			scale={scale || 1}
			mediaQuery={mediaQuery || false}
		>
			Todo List con React
		</TitleSpan>
	);
};

const TitleSpan = styled.span`
	display: inline-block;
	font-size: 0.8rem;
	text-align: right;
	text-transform: uppercase;
	font-weight: 700;
	color: ${({ color }) => color};
	width: 130px;
	${({ scale }) => scale && `transform: scale(${scale});`}

	&::first-line {
		font-size: 1.6rem;
	}

	${({ mediaQuery }) =>
		mediaQuery &&
		`
		@media (min-width: 1024px) {
			display: none;
		}
	`}
`;

export default Title;
