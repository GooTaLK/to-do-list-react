import React from 'react';
import styled from 'styled-components';
import { v4 as uuidV4 } from 'uuid';
import colors from '../helpers/colors';

import Task from './Task';

const TasksProject = ({ tasks, name, task_id, ...props }) => {
	return (
		<div>
			<PrjTitle>{name}</PrjTitle>
			{tasks
				.filter((task) => task_id.includes(task.id))
				.reverse()
				.map((task) => (
					<Task
						key={uuidV4()}
						parent={task.parent}
						parent_slug={task.parent_slug}
						title={task.name}
						date={task.date}
						description={task.description}
						bgColor={task.bgColor}
						color={task.color}
						id={task.id}
						{...props}
					/>
				))}
		</div>
	);
};

const PrjTitle = styled.p`
	background-color: ${colors.MAIN_MODAL};
	text-align: center;
	text-transform: uppercase;
	font-weight: bold;

	@media (min-width: 1024px) {
		transform: translateX(-3rem);
	}
`;

export default TasksProject;
