import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// HELPERS
import ajax from './helpers/ajax-fetch';
import data from './helpers/data';

// COMPONENTS
import Main from './Components/Main';
import ModalWindow from './Components/ModalWindow';
import Sidebar from './Components/Sidebar';
import Topbar from './Components/Topbar';
import TaskModalWindow from './Components/TaskModalWindow';

class App extends Component {
	state = {
		tasks: [],
		projects: [],
		modalWindow: {
			active: false,
			form: {
				process: 'add',
				id: null,
				name: '',
				description: '',
				project: '',
				bg: '',
				color: 'black',
				submitValue: 'Agregar',
			},
		},
		taskModalWindow: {
			active: false,
			task: {
				name: '',
				parent: '',
				parent_slug: '',
				date: '',
				description: '',
			},
		},
		page: '',
		currentProject: {
			name: '',
			slug: '',
		},
	};

	async componentDidMount() {
		this.getTasks();
		this.getProjects();
	}

	getTasks = () =>
		ajax({
			url: data.TASKS,
			cbSucces: (json) => this.setState({ tasks: json }),
		});

	getProjects = () =>
		ajax({
			url: data.PROJECTS,
			cbSucces: (json) => this.setState({ projects: json }),
		});

	postTasks = (newTask) =>
		ajax({
			url: data.TASKS,
			method: 'POST',
			body: JSON.stringify(newTask),
		});

	postProjects = (newProject = {}) =>
		ajax({
			url: data.PROJECTS,
			method: 'POST',
			body: JSON.stringify(newProject),
		});

	deleteTask = (id) =>
		ajax({
			url: `${data.TASK}${id}`,
			method: 'DELETE',
		});

	deleteProject = (id) =>
		ajax({
			url: `${data.PROJECT}${id}`,
			method: 'DELETE',
		});

	patchProject = (patch, id) =>
		ajax({
			url: `${data.PROJECT}${id}`,
			method: 'PATCH',
			body: JSON.stringify(patch),
		});

	patchTask = (patch, id) =>
		ajax({
			url: `${data.TASK}${id}`,
			method: 'PATCH',
			body: JSON.stringify(patch),
		});

	modifyModalWindow = (active, form) => {
		const formMW = this.state.modalWindow.form;
		this.setState({ modalWindow: { active, form: { ...formMW, ...form } } });
	};

	modifyCurrentProject = ({ name, slug }) =>
		this.setState({ currentProject: { name, slug } });

	modifyTaskModalWindow = (
		active,
		task = { name: '', parent: '', parent_slug: '', date: '', description: '' }
	) => this.setState({ taskModalWindow: { active, task } });

	modifyPage = (selected) => this.setState({ page: selected });

	render() {
		return (
			<BrowserRouter>
				<Topbar
					modifyTMW={this.modifyTaskModalWindow}
					tasks={this.state.tasks}
				/>

				{this.state.tasks.length !== 0 && this.state.projects.length !== 0 && (
					<Switch>
						<Route path="/project">
							<Main
								content="project"
								tasks={this.state.tasks}
								projects={this.state.projects}
								cPrj={this.state.currentProject}
								deleteTask={this.deleteTask}
								patchProject={this.patchProject}
								getTasks={this.getTasks}
								getProjects={this.getProjects}
								modifyMW={this.modifyModalWindow}
								modifyCPrj={this.modifyCurrentProject}
								modifyPage={this.modifyPage}
								modifyTMW={this.modifyTaskModalWindow}
							/>
						</Route>

						<Route path="/today">
							<Main
								content="today"
								tasks={this.state.tasks}
								projects={this.state.projects}
								cPrj={this.state.currentProject}
								deleteTask={this.deleteTask}
								patchProject={this.patchProject}
								getTasks={this.getTasks}
								getProjects={this.getProjects}
								modifyMW={this.modifyModalWindow}
								modifyCPrj={this.modifyCurrentProject}
								modifyPage={this.modifyPage}
								modifyTMW={this.modifyTaskModalWindow}
							/>
						</Route>

						<Route path="/soon">
							<Main
								content="soon"
								tasks={this.state.tasks}
								projects={this.state.projects}
								cPrj={this.state.currentProject}
								deleteTask={this.deleteTask}
								patchProject={this.patchProject}
								getTasks={this.getTasks}
								getProjects={this.getProjects}
								modifyMW={this.modifyModalWindow}
								modifyCPrj={this.modifyCurrentProject}
								modifyPage={this.modifyPage}
								modifyTMW={this.modifyTaskModalWindow}
							/>
						</Route>

						<Route exact path="/">
							<Main
								content="home"
								tasks={this.state.tasks}
								projects={this.state.projects}
								cPrj={this.state.currentProject}
								getTasks={this.getTasks}
								getProjects={this.getProjects}
								deleteTask={this.deleteTask}
								patchProject={this.patchProject}
								modifyMW={this.modifyModalWindow}
								modifyCPrj={this.modifyCurrentProject}
								modifyPage={this.modifyPage}
								modifyTMW={this.modifyTaskModalWindow}
							/>
						</Route>
					</Switch>
				)}

				<Sidebar
					selected={this.state.page}
					tasks={this.state.tasks}
					projects={this.state.projects}
					getTasks={this.getTasks}
					getProjects={this.getProjects}
					postProjects={this.postProjects}
					deleteProject={this.deleteProject}
					patchTask={this.patchTask}
					modifyCPrj={this.modifyCurrentProject}
					modifyPage={this.modifyPage}
				/>

				<ModalWindow
					active={this.state.modalWindow.active}
					formMW={this.state.modalWindow.form}
					modifyMW={this.modifyModalWindow}
					tasks={this.state.tasks}
					getTasks={this.getTasks}
					getProjects={this.getProjects}
					postTasks={this.postTasks}
					projects={this.state.projects}
					patchProject={this.patchProject}
					patchTask={this.patchTask}
				/>

				<TaskModalWindow
					active={this.state.taskModalWindow.active}
					task={this.state.taskModalWindow.task}
					modifyTMW={this.modifyTaskModalWindow}
				/>
			</BrowserRouter>
		);
	}
}

export default App;
