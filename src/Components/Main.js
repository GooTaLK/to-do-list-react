import React, { Component } from 'react';
import styled from 'styled-components';

import SingleInput from './SingleInput';
import Tasks from './Tasks';

class Main extends Component {
	state = {
		noSpecialContent: ['project', 'soon', 'today'],
	};

	componentDidMount() {
		this.props.modifyPage(this.props.content);

		if (
			this.props.cPrj.name === '' &&
			window.location.pathname.indexOf('/project') !== -1
		) {
			const path = window.location.pathname.replace('/project/', '');
			const prj = this.props.projects.filter((el) => el.slug === path);

			this.props.modifyCPrj({ name: prj[0].name, slug: prj[0].slug });
		}
	}

	mainTitle = () => {
		let title;

		if (this.props.content === 'project') {
			title = this.props.cPrj.name;
		} else {
			title = this.props.content === 'soon' ? 'Próximos' : 'Para hoy';
		}

		return title;
	};

	render() {
		const { content, ...props } = this.props;

		return (
			<MainContainer className="main">
				{this.state.noSpecialContent.includes(content) && (
					<h2 className="main__title">{this.mainTitle()}</h2>
				)}

				{content === 'home' && <SingleInput modifyMW={props.modifyMW} />}

				<Tasks
					nSContent={this.state.noSpecialContent}
					content={content}
					{...props}
				/>
			</MainContainer>
		);
	}
}

const MainContainer = styled.main`
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 85vh;
	margin-bottom: 100px;

	@media (min-width: 1024px) {
		margin-left: 15vw;
	}
`;

export default Main;
