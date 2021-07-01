import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const TaskModalWindow = ({ active, task, modifyTMW }) => {
	return (
		<TaskLayer
			className={active ? 'active' : ''}
			onClick={() => modifyTMW(false)}
		>
			<Task onClick={(e) => e.stopPropagation()}>
				<TaskHeader className="task__header">
					<span>
						{task.name}
						<br />
						<Link
							to={(location) => ({
								...location,
								pathname: `/project/${task.parent_slug}`,
							})}
						>
							{task.parent}
						</Link>
					</span>
					<span>Fecha: {task.date}</span>
				</TaskHeader>
				<div className="task__description">
					<TaskDescription>{task.description}</TaskDescription>
				</div>
			</Task>
		</TaskLayer>
	);
};

const TaskLayer = styled.div`
	position: fixed;
	width: 100vw;
	height: 100vh;
	top: 0;
	left: 0;
	z-index: 20;
	display: grid;
	place-items: center;
	display: none;

	&.active {
		display: grid;
	}
`;

const Task = styled.div`
	background-color: #fff;
	width: 85%;
	padding: 1rem;
	border-radius: 5px;
	min-height: 50vh;
`;

const TaskHeader = styled.div`
	padding: 0.5rem 2rem;
	display: flex;
	justify-content: space-between;
`;

const TaskDescription = styled.p`
	padding: 1rem;
	/* word-wrap: break-word; */
`;

export default TaskModalWindow;
