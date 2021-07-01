import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import colors from '../helpers/colors';

const NavLI = ({ title, linkTo, active, dataType, handleClick }) => (
	<ListItem>
		<LinkStyled
			className={active ? 'link active' : 'link'}
			data-name={dataType}
			onClick={handleClick}
			to={(location) =>
				linkTo ? { ...location, pathname: `${linkTo}` } : `${location.pathname}`
			}
		>
			{title}
		</LinkStyled>
	</ListItem>
);

const ListItem = styled.li`
	margin: 0.5rem;
	position: relative;
	overflow-x: hidden;

	&::after {
		content: '';
		position: absolute;
		display: block;
		background-color: #fff;
		height: 2px;
		width: 100%;
		bottom: 0;
		left: -100%;
		/* left: 0; */
		transition: transform 0.3s;
	}

	&:hover::after {
		transform: translateX(100%);
	}
`;

const LinkStyled = styled(Link)`
	overflow-y: visible;
	color: #eee;
	font-size: 1.1rem;
	text-decoration: none;
	cursor: pointer;
	display: block;
	padding: 8px;
	border-radius: 6px 6px 0 0;

	&.active {
		font-weight: 600;
		color: #222;
		/* background-color: ${colors.BASE_TRANSPARENT}; */
		/* border-left: #eee solid 4px; */
		border-bottom: #ddd solid 2px;
	}
`;

export default NavLI;
