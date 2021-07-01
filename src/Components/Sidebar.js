import React, { Component } from 'react';
import styled from 'styled-components';

import MenuButton from './MenuButton';
import Nav from './Nav';
import Title from './Title';

class Sidebar extends Component {
	state = { active: true };

	mustShow = () =>
		window.innerWidth >= 1024
			? this.setState({ active: true })
			: this.setState({ active: false });

	handleActive = () => this.setState({ active: !this.state.active });

	componentDidMount() {
		this.mustShow();

		window.addEventListener('resize', this.mustShow);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.mustShow);
	}

	render() {
		const { ...props } = this.props;

		return (
			<>
				<SBDiv className={this.state.active ? 'sidebar active' : 'sidebar'}>
					<SBTitle className="sidebar__title">
						<Title color="#000" scale={1.1} />
					</SBTitle>
					<SBMenu className="sidebar__menu">
						<Nav handleActive={this.handleActive} {...props} />
					</SBMenu>
				</SBDiv>
				<MenuButton handleClick={this.handleActive} />
			</>
		);
	}
}

const CLIP_PATH = 'circle(5rem at left calc(20vh + 5rem))';

const SBDiv = styled.div`
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100vw;
	height: 70vh;
	transform: translateY(calc(50vh - 5rem));
	clip-path: ${CLIP_PATH};
	border-radius: 1.5rem;
	transition: transform 0.4s, clip-path 0.4s;

	&.active {
		transform: translateY(0);
		clip-path: circle(100% at 50% 50%);
	}

	@media (min-width: 1024px) {
		width: 15vw;
		height: 100vh;
		clip-path: none;
		transform: translateY(0);
	}
`;

const SBTitle = styled.div`
	display: grid;
	place-items: center;
	background-color: rgba(244, 98, 0, 0.5);
	height: 20vh;
	border-radius: 2rem 2rem 0 0;

	@media (min-width: 1024px) {
		background-color: rgb(244, 98, 0);
		border-radius: 0;
	}
`;

const SBMenu = styled.div`
	display: grid;
	place-items: center;
	background-color: rgb(244, 98, 0);
	height: 50vh;

	@media (min-width: 1024px) {
		height: 80vh;
	}
`;

export default Sidebar;
