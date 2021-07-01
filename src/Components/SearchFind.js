import React from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

const SearchFind = ({ modifyTMW, active, tasks, value }) => {
	const findedTasks = (value, tasks) => {
		return tasks.filter(
			(task) => task.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
		);
	};

	return (
		<Div className={active ? 'active' : ''}>
			{findedTasks(value, tasks).map((task) => (
				<Finded
					key={uuidv4()}
					onClick={() =>
						modifyTMW(true, {
							name: task.name,
							parent: task.parent,
							parent_slug: task.parent_slug,
							date: task.date,
							description: task.description,
						})
					}
				>
					<p>{task.name}</p>
				</Finded>
			))}
		</Div>
	);
};

const Div = styled.div`
	display: none;
	position: absolute;
	top: 100%;
	left: 2rem;
	background-color: #fff;

	&.active {
		display: block;
	}
`;

const Finded = styled.div`
	padding: 0.5rem 1rem;
	cursor: pointer;
	transition: backgroundColor 0.3s;

	&:hover {
		background-color: #ccc;
	}
`;

export default SearchFind;
