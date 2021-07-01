import React from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';
import { /* BsInfoSquare, */ BsTrash, BsPencilSquare } from 'react-icons/bs';

import { mwForm } from './ModalForm';

const safeCP = `
clip-path: polygon(
	90% 0%,
	66% 2%,
	40% 0%,
	24% 1%,
	0% 0%,
	0% 100%,
	84% 99%,
	99% 93%,
	95% 68%,
	100% 34%,
	100% 26%,
	93% 26%,
	100% 19%,
	99% 5%
);
`;
const breakCP = `
clip-path: polygon(
	100% 0,
	100% 21%,
	93% 24%,
	99% 26%,
	98% 61%,
	100% 100%,
	66% 98%,
	0 100%,
	0 0,
	41% 3%
);
`;

const Task = ({
	index,
	title,
	parent,
	parent_slug,
	date,
	description,
	bgColor,
	color,
	id,
	projects,
	deleteTask,
	getTasks,
	getProjects,
	patchProject,
	modifyMW,
	modifyCPrj,
	modifyPage,
	modifyTMW,
}) => {
	let random12 = Math.round(Math.random() * 10) % 2;

	const handleEditBtn = (e) => {
		const taskData = JSON.parse(
			e.target.dataset.task_info ||
				e.target.parentElement.dataset.task_info ||
				e.target.parentElement.parentElement.dataset.task_info
		);

		mwForm.current.task_project.value = taskData.parent;
		mwForm.current.task_bg.value = taskData.bgColor;
		mwForm.current.task_color.value = taskData.color;

		modifyMW(true, {
			process: 'edit',
			submitValue: 'Editar',
			id: taskData.id,
			project: taskData.parent,
			name: taskData.title,
			description: taskData.description,
			bg: taskData.bgColor,
			color: taskData.color,
		});
	};

	const handleDeleteBtn = (e) => {
		const id =
			e.target.value ||
			e.target.parentElement.value ||
			e.target.parentElement.parentElement.value;
		const confirmation = window.confirm(`¿Desea eliminar la tarea "${title}"?`);

		if (confirmation) {
			if (parent !== '') {
				const prj = projects.filter((prj) => prj.name === parent);
				const patch = prj[0].task_id.filter((el) => el !== Number(id));

				patchProject({ task_id: patch }, prj[0].id);
			}

			deleteTask(id);
		}

		getTasks();
		getProjects();
	};

	const handleClickParent = (e) => {
		e.stopPropagation();

		modifyPage('project');
		modifyCPrj({ name: parent, slug: parent_slug });
	};

	return (
		<TaskGroup>
			<TaskContent
				className={random12 === 0 ? 'task--break' : 'task--safe'}
				bgColor={bgColor}
				color={color}
				onClick={() =>
					modifyTMW(true, {
						name: title,
						parent,
						parent_slug,
						date,
						description,
					})
				}
			>
				{parent !== '' && (
					<>
						<TaskParent
							to={(location) =>
								parent_slug
									? { ...location, pathname: `/project/${parent_slug}` }
									: `${location.pathname}`
							}
							onClick={(e) => handleClickParent(e)}
							color={color}
						>
							{parent}
						</TaskParent>
						<br />
					</>
				)}

				<TaskDate>{date}</TaskDate>

				<TaskTitle>{title}: </TaskTitle>

				<TaskDescription>{description}</TaskDescription>
			</TaskContent>
			<TaskButtons>
				{/* <TaskBtn>
					<BsInfoSquare style={ButtonLineStyles} />
				</TaskBtn> */}
				<TaskBtn
					value={id}
					onClick={handleEditBtn}
					data-task_info={JSON.stringify({
						parent,
						title,
						color,
						bgColor,
						description,
						id,
					})}
				>
					<BsPencilSquare style={ButtonLineStyles} />
				</TaskBtn>
				<TaskBtn value={id} onClick={handleDeleteBtn}>
					<BsTrash style={ButtonLineStyles} />
				</TaskBtn>
			</TaskButtons>
		</TaskGroup>
	);
};

const ButtonLineStyles = {
	margin: '0.5rem',
	fontSize: '1.3em',
	cursor: 'pointer',
};

const TaskGroup = styled.div`
	display: flex;
	align-items: center;
	margin-top: 1.8rem;
	margin-bottom: 1rem;
	flex-wrap: wrap;
`;

const TaskContent = styled.div`
	position: relative;
	width: 100%;
	/* position: relative; */
	word-wrap: break-word;
	border-left: 0.4rem solid #444;
	padding: 1rem;
	margin-left: 1rem;
	margin-right: 1rem;
	border-radius: 0 0.3rem 2rem 0;
	cursor: pointer;
	user-select: none;
	transition: transform 0.3s;
	color: ${({ color }) => color};
	/* background-color: ${({ bgColor }) => bgColor}; */
	background: linear-gradient(
		110deg,
		${({ bgColor }) => bgColor} 75%,
		#e0e0e040 100%
	);

	/* &:hover {
		transform: scale(0.97);
	} */

	&.task--safe {
		${safeCP}
	}
	&.task--break {
		${breakCP}
	}

	/* :after {
		content: '';
		position: absolute;
		top: 0;
		left: 100%;
		display: block;
		height: 100%;
		width: 100px;
		background: linear-gradient(
			90deg,
			${({ bgColor }) => bgColor} 10%,
			rgba(0, 0, 0, 0) 100%
		);
	} */

	@media (min-width: 680px) {
		width: calc(80% - 3rem);
		padding-right: 2rem;
	}
`;

const TaskParent = styled(Link)`
	margin-bottom: 0.5rem;
	color: ${({ color }) => color};
	text-transform: uppercase;
	font-weight: bold;
	font-style: oblique;
	text-decoration: none;
	border-bottom: 3px solid #333;
	display: inline-block;
	position: relative;
	overflow: hidden;
	padding: 4px;

	&::before {
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		bottom: -100%;
		left: 0;
		z-index: -10;
		background-color: #444;
		border-radius: 4px 4px 0 0;
		transition: transform 0.4s;
	}

	&:hover {
		color: #eee;
	}

	&:hover::before {
		transform: translateY(-100%);
	}
`;

const TaskDate = styled.span`
	position: absolute;
	right: 100px;
	top: 20px;
`;

const TaskTitle = styled.span`
	font-weight: 600;
	font-size: 1.2rem;
`;

const TaskDescription = styled.span`
	word-wrap: break-word;
	font-size: 0.9rem;
	display: inline-block;
	width: 240px;

	@media (min-width: 320px) {
		width: 100%;
	}
`;

const TaskButtons = styled.div`
	margin-left: auto;
	margin-right: 1rem;

	@media (min-width: 680px) {
		width: calc(20% - 1rem);
	}
`;

const TaskBtn = styled.button`
	padding: 0;
	border: none;
	cursor: pointer;
`;

export default Task;
