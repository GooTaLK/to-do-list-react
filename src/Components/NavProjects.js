import React, { Component, createRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { BsTrash } from 'react-icons/bs';
import { FaBookDead } from 'react-icons/fa';

import colors from '../helpers/colors';

class NavProjects extends Component {
	state = {
		isAdding: false,
	};

	AddOrCancel = createRef();

	handleShowInput = (e) => {
		e.target.textContent = this.state.isAdding ? 'Agregar +' : 'Cancelar X';
		this.setState({ isAdding: !this.state.isAdding });
	};

	handleSubmitProject = (e) => {
		e.preventDefault();

		const projectName = e.target.project_name.value;
		const slugFormat = new RegExp(/^[a-z0A-Z-9ñÑ]+(\s[a-zA-Z0-9ñÑ]+){0,2}$/);

		if (!slugFormat.test(projectName)) return;

		const newProject = {
			name: projectName,
			task_id: [],
			slug: projectName.replace(' ', '_').toLowerCase(),
		};

		e.target.project_name.value = '';

		this.props.postProjects(newProject);
		this.AddOrCancel.current.click();
		this.props.getProjects();
	};

	handleDeleteProject = (e) => {
		const projectId =
			e.target.dataset.project_id || e.target.parentElement.dataset.project_id;
		const projectName =
			e.target.dataset.project_name ||
			e.target.parentElement.dataset.project_name;
		const childTask = this.props.tasks.filter(
			(task) => task.parent === projectName
		);

		childTask.forEach((el) => this.props.patchTask({ parent: '' }, el.id));
		this.props.deleteProject(projectId);
		this.props.getProjects();
		this.props.getTasks();
	};

	handleClickProject = (e) => {
		this.props.modifyCPrj({
			name: e.target.dataset.project_name,
			slug: e.target.dataset.project_slug,
		});
		this.props.modifyPage('project');
	};

	render() {
		const { active, projects } = this.props;

		return (
			<Div className={active ? 'active' : ''}>
				<Projects className={active ? 'project-list active' : 'project-list'}>
					<Ul>
						{projects.map((el) => (
							<ProjectLI key={el.id * 100 - 1}>
								<Project
									to={(location) =>
										el.slug
											? { ...location, pathname: `/project/${el.slug}` }
											: `${location.pathname}`
									}
									data-project_name={el.name}
									data-project_slug={el.slug}
									onClick={this.handleClickProject}
								>
									{el.name}
								</Project>
								<TrashBtn>
									<Trash
										data-project_id={el.id}
										data-project_name={el.name}
										onClick={this.handleDeleteProject}
									/>
								</TrashBtn>
							</ProjectLI>
						))}

						<Li ref={this.AddOrCancel} onClick={this.handleShowInput}>
							Agregar +
						</Li>

						{this.state.isAdding && (
							<li>
								<form onSubmit={this.handleSubmitProject}>
									<input
										name="project_name"
										placeholder="Nuevo proyecto..."
										pattern="^[A-Za-z0-9ñÑ]+(\s[A-Za-z0-9ñÑ]+){0,2}$"
									/>
									<button type="submit">
										<FaBookDead />
									</button>
								</form>
							</li>
						)}
					</Ul>
				</Projects>
			</Div>
		);
	}
}

const Div = styled.div`
	height: 0;
	overflow-y: hidden;

	&.active {
		height: auto;
	}
`;

const Projects = styled.div`
	background-color: ${colors.MAIN_MODAL};
	padding: 10px;
	border-radius: 4px;
	border-top: 4px solid ${colors.BASE};
	/* display: none; */
	/* height: 0; */
	transform: /* translateY(-50%), */ scaleY(0);
	transition: transform 0.3s;

	&.active {
		/* display: block; */
		/* height: auto; */
		transform: /* translateY(0%), */ scaleY(1);
	}
`;

const Ul = styled.ul`
	list-style: none;
	padding-left: 0;
`;

const ProjectLI = styled.li`
	border-bottom: 1px solid #444;
`;

const Project = styled(Link)`
	color: #000;
	text-decoration: none;
	padding: 4px;

	&:hover {
		background-color: ${colors.MAIN_TRANSPARENT};
	}
`;

const TrashBtn = styled.button`
	border: none;
	padding: 5px;
	background-color: transparent;

	&:hover {
		background-color: ${colors.MAIN_TRANSPARENT};
	}
`;

const Trash = styled(BsTrash)`
	font-size: 1rem;
	cursor: pointer;
`;

const Li = styled.li`
	font-size: 0.9em;
	padding: 4px 0;
	cursor: pointer;

	&:hover {
		background-color: ${colors.MAIN_TRANSPARENT};
	}
`;

export default NavProjects;
