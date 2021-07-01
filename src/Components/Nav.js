import React, { Component } from 'react';
import styled from 'styled-components';

import NavLI from './NavLI';
import NavProjects from './NavProjects';

class Nav extends Component {
	state = { showProjects: false };

	handleClick = (e) => {
		const replaceState = {
			selected: e.target.dataset.name,
			showProjects: false,
		};

		if (e.target.dataset.name === 'project') {
			replaceState.showProjects = !this.state.showProjects;
			this.setState(replaceState);
			return;
		}

		this.props.handleActive();
		this.props.modifyPage(replaceState.selected);
		this.setState(replaceState);
	};

	render() {
		const { selected, ...props } = this.props;

		return (
			<Menu>
				<List>
					<NavLI
						title="Agregar"
						dataType="home"
						linkTo="/"
						handleClick={this.handleClick}
						active={selected === 'home' ? true : false}
					/>
					<NavLI
						title="Proyectos"
						dataType="project"
						handleClick={this.handleClick}
						active={selected === 'project' ? true : false}
					/>
					<NavProjects active={this.state.showProjects} {...props} />
					<NavLI
						title="Próximos"
						dataType="soon"
						linkTo="/soon"
						handleClick={this.handleClick}
						active={selected === 'soon' ? true : false}
					/>
					<NavLI
						title="Hoy"
						dataType="today"
						linkTo="/today"
						handleClick={this.handleClick}
						active={selected === 'today' ? true : false}
					/>
				</List>
			</Menu>
		);
	}
}

const Menu = styled.nav`
	/* transform: translateY(); */
	overflow: auto;
`;

const List = styled.ul`
	list-style: none;
	text-align: center;
	padding-left: 0;
`;

export default Nav;
