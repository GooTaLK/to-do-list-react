import React, { Component } from 'react';
import { IoIosSearch } from 'react-icons/io';
import styled from 'styled-components';

import SearchFind from './SearchFind';

class Searching extends Component {
	state = {
		active: false,
		inputValue: '',
	};

	handleChangeValue = (e) =>
		e.target.value === ''
			? this.setState({ active: false })
			: this.setState({ active: true, inputValue: e.target.value });

	render() {
		return (
			<SearchContainer className="search">
				<SearchIcon className="search__icon" />
				<SearchInput
					className="search__input"
					type="search"
					placeholder="Buscar..."
					onChange={(e) => this.handleChangeValue(e)}
					onBlur={() => setTimeout(() => this.setState({ active: false }), 500)}
				/>
				<SearchFind
					active={this.state.active}
					tasks={this.props.tasks}
					value={this.state.inputValue}
					modifyTMW={this.props.modifyTMW}
				/>
			</SearchContainer>
		);
	}
}

const SearchContainer = styled.div`
	position: relative;
`;

const SearchIcon = styled(IoIosSearch)`
	font-size: 1.5em;
	transform: translateY(8px);

	@media (min-width: 1024px) {
		font-size: 1.8em;
	}
`;

const SearchInput = styled.input`
	background-color: transparent;
	border: none;
	border-bottom: 1px solid #000;
	line-height: 1.3em;
	font-size: 1em;
	padding: 0.2rem 0.7rem;
	margin-left: 8px;
	width: 100px;
	outline: none;

	@media (min-width: 345px) {
		transition: width 0.5s;

		&:focus {
			width: 150px;
		}
	}

	@media (min-width: 1024px) {
		width: 150px;
		font-size: 1.1em;
		transition: width 0.5s;

		&:focus {
			width: 250px;
		}
	}
`;

export default Searching;
