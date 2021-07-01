import React, { Component } from 'react';
import styled from 'styled-components';
import { FaBars } from 'react-icons/fa';

const MenuBtn = styled(FaBars)`
	position: fixed;
	left: 0.5vw;
	bottom: 0.5vh;
	z-index: 10;
	color: #fff;
	font-size: 3.5rem;
	border-radius: 40%;
	padding: 8px;

	&:hover {
		background-color: #00000050;
	}

	@media (min-width: 1024px) {
		display: none;
	}
`;

class MenuButton extends Component {
	state = {
		show: true,
	};

	render() {
		const { handleClick } = this.props;

		return <MenuBtn id="menu-btn" onClick={handleClick} />;
	}
}

export default MenuButton;
