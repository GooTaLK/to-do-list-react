import React, { Component } from 'react';
import styled from 'styled-components';
import { v4 as uuidV4 } from 'uuid';

import Task from './Task';
import TasksProject from './TasksProject';

class Tasks extends Component {
	taskContent = () => {
		const thisDay = new Date();
		let taskArray = [];

		const reDate = (date) => {
			const arrayDate = date.split('-');

			arrayDate.push(Number(arrayDate.pop()) + 1);
			return arrayDate.join('-');
		};

		this.props.content === 'home' &&
			(taskArray = this.props.tasks.filter((task) => task.parent === ''));

		this.props.content === 'soon' &&
			(taskArray = this.props.tasks.filter(
				(task) => new Date(reDate(task.date)).getTime() > thisDay.getTime()
			));

		this.props.content === 'today' &&
			(taskArray = this.props.tasks.filter(
				(task) =>
					new Date(reDate(task.date)).toDateString() === thisDay.toDateString()
			));

		if (this.props.content === 'project') {
			const path = window.location.pathname.replace('/project/', '');
			const prj = this.props.projects.filter(
				(project) => project.slug === path
			);
			const prjTasks = this.props.tasks.filter((task) =>
				prj[0].task_id.includes(task.id)
			);

			taskArray = prjTasks;
		}

		return taskArray;
	};

	render() {
		const { content, ...props } = this.props;

		return (
			<MainTasks className="main__tasks">
				{this.taskContent()
					.reverse()
					.map((task, index) => (
						<Task
							index={index}
							key={uuidV4()}
							title={task.name}
							parent={task.parent}
							parent_slug={task.parent_slug}
							date={task.date}
							description={task.description}
							bgColor={task.bgColor}
							color={task.color}
							id={task.id}
							{...props}
						/>
					))}
				{content === 'home' &&
					this.props.projects.map((prj) => (
						<TasksProject
							key={uuidV4()}
							name={prj.name}
							task_id={prj.task_id}
							{...props}
						/>
					))}
			</MainTasks>
		);
	}
}

const MainTasks = styled.div`
	margin-top: 3rem;
	width: 95%;

	@media (min-width: 680px) {
		width: 75%;
	}
`;

export default Tasks;
