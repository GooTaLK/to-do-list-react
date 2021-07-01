import React from 'react';
import styled from 'styled-components';

import Searching from './Searching';
import Title from './Title';

const Topbar = ({ modifyTMW, tasks }) => (
	<TopbarDiv className="topbar">
		<Searching modifyTMW={modifyTMW} tasks={tasks} />
		<Title mediaQuery={true} />
	</TopbarDiv>
);

const TopbarDiv = styled.div`
	position: sticky;
	top: 0;
	z-index: 10;
	padding-left: 1rem;
	padding-right: 1rem;
	height: 15vh;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: #eee;

	@media (min-width: 1024px) {
		margin-left: 15vw;
		padding-left: 5rem;
	}
`;

export default Topbar;
