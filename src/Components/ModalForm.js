import React, { Component, createRef } from 'react';
import styled from 'styled-components';

import { formatDate } from '../helpers/currentDate';

class ModalForm extends Component {
	handleSubmit = (e) => {
		e.preventDefault();

		const newTask = {
			parent:
				e.target.task_project.value === '' ? '' : e.target.task_project.value,
			parent_slug:
				e.target.task_project.value === ''
					? ''
					: e.target.task_project.value.replace(' ', '_').toLowerCase(),
			name: e.target.task_name.value,
			bgColor: e.target.task_bg.value,
			color: e.target.task_color.value,
			description: e.target.task_description.value,
			date: e.target.task_date.value,
			checked: false,
		};
		const oldTask = this.props.tasks.filter(
			(task) => task.id === this.props.formMW.id
		);
		const parent = this.props.projects.filter(
			(prj) => prj.name === e.target.task_project.value
		);

		if (this.props.formMW.process === 'add') {
			parent.length !== 0 &&
				this.props.patchProject(
					{ task_id: [...parent[0].task_id, this.props.tasks.length + 1] },
					parent[0].id
				);
			this.props.postTasks(newTask);
		} else if (this.props.formMW.process === 'edit') {
			if (parent.length !== 0 && oldTask[0].parent !== parent[0].name) {
				const oldParent = this.props.projects.filter(
					(prj) => prj.name === oldTask[0].parent
				);
				const patchOldPrj =
					oldParent.length !== 0
						? oldParent[0].task_id.filter((el) => el !== this.props.formMW.id)
						: null;

				patchOldPrj !== null &&
					this.props.patchProject({ task_id: patchOldPrj }, oldParent[0].id);
				this.props.patchProject(
					{
						task_id: [...parent[0].task_id, this.props.formMW.id],
					},
					parent[0].id
				);
			}
			this.props.patchTask(newTask, this.props.formMW.id);
		}

		e.target.task_date.value = formatDate;
		this.props.modifyMW(false, { name: '', description: '' });
		this.props.getTasks();
		this.props.getProjects();
	};

	handleChange = (e) => {
		const name = e.target.name.replace('task_', '');

		this.props.modifyMW(true, { [name]: e.target.value });
	};

	render() {
		const { formMW, projects } = this.props;

		return (
			<MwForm
				onSubmit={this.handleSubmit}
				onClick={(e) => e.stopPropagation()}
				ref={mwForm}
			>
				<MwDiv>
					<MwLabel htmlFor="new-task-project">Proyecto asociado</MwLabel>
					<MWSelect
						name="task_project"
						id="new-task-project"
						onChange={this.handleChange}
					>
						<option value="">Sin Proyecto agregado</option>
						{projects.map((el) => (
							<option key={el.id * 10 - 2} value={el.name}>
								{el.name}
							</option>
						))}
					</MWSelect>
				</MwDiv>

				<MwDiv>
					<MwLabel htmlFor="new-task-name">Nombre de la tarea</MwLabel>
					<MWInput
						name="task_name"
						id="new-task-name"
						placeholder="Nombre de la tarea"
						value={formMW.name}
						onChange={this.handleChange}
					/>
				</MwDiv>

				<MwDiv>
					<MwLabel>Color de fondo</MwLabel>

					<RadioLabel htmlFor="new-task-bg-red">
						<RadioInput
							type="radio"
							id="new-task-bg-red"
							name="task_bg"
							value="#e33"
							onChange={this.handleChange}
						/>
						<ColorLayer color="red" />
					</RadioLabel>

					<RadioLabel htmlFor="new-task-bg-blue">
						<RadioInput
							type="radio"
							id="new-task-bg-blue"
							name="task_bg"
							value="#04f"
							onChange={this.handleChange}
						/>
						<ColorLayer color="blue" />
					</RadioLabel>

					<RadioLabel htmlFor="new-task-bg-yellow">
						<RadioInput
							type="radio"
							id="new-task-bg-yellow"
							name="task_bg"
							value="#ee0"
							onChange={this.handleChange}
						/>
						<ColorLayer color="yellow" />
					</RadioLabel>

					<RadioLabel htmlFor="new-task-bg-green">
						<RadioInput
							type="radio"
							id="new-task-bg-green"
							name="task_bg"
							value="green"
						/>
						<ColorLayer color="green" />
					</RadioLabel>
				</MwDiv>

				<MwDiv>
					<MwLabel htmlFor="new-task-color">Color de letra</MwLabel>
					<MWSelect
						name="task_color"
						id="new-task-color"
						onChange={this.handleChange}
					>
						<option value="black">Negro</option>
						<option value="white">Blanco</option>
					</MWSelect>
				</MwDiv>

				<MwDiv>
					<MwLabel htmlFor="new-task-date">Descripción</MwLabel>
					<MwTextArea
						name="task_description"
						id="new-task-description"
						value={formMW.description}
						onChange={this.handleChange}
					/>
				</MwDiv>

				<MwDiv>
					<DateLabel htmlFor="new-task-date">Fecha: </DateLabel>
					<DateInput
						name="task_date"
						id="new-task-date"
						type="date"
						defaultValue={formatDate}
					/>
				</MwDiv>

				<MwDiv>
					<SubmitInput type="submit" value={this.props.formMW.submitValue} />
				</MwDiv>
			</MwForm>
		);
	}
}

const MwForm = styled.form`
	border-radius: 0.7rem;
	border: 2px solid #eee;
	background-color: #333;
	padding: 1rem 2.5rem;
`;

const MwDiv = styled.div`
	text-align: center;
	color: #fff;
	padding: 0.4rem;
`;

const MwLabel = styled.label`
	font-weight: 600;
	display: block;
	padding-bottom: 0.4rem;
	cursor: pointer;
`;

const MWSelect = styled.select`
	padding: 0.2rem;
	border-radius: 5px;
`;

const MWInput = styled.input`
	text-align: center;
	color: #fff;
	padding: 0.2rem;
	background-color: transparent;
	border: none;
	border-bottom: 1px solid #fff;
`;

const MwTextArea = styled.textarea`
	resize: none;
	height: 80px;
`;

const RadioLabel = styled.label`
	display: inline-block;
	position: relative;
	margin-right: 0.2rem;
	margin-left: 0.2rem;
	height: 45px;
	width: 45px;
`;

const ColorLayer = styled.span`
	display: block;
	position: absolute;
	width: 100%;
	height: 100%;
	background-color: ${({ color }) => color};
	border-radius: 2px;
`;

const RadioInput = styled.input`
	display: none;

	&:checked ~ span {
		border: 4px solid #eee;
		clip-path: polygon(0 20px, 20px 0, 100% 0, 100% 25px, 25px 100%, 0 100%);
	}
`;

const DateLabel = styled.label`
	font-weight: 600;
	cursor: pointer;
`;

const DateInput = styled.input`
	color: #fff;
	background-color: transparent;
	border: none;
	border-bottom: 1px solid #fff;
`;

const SubmitInput = styled.input`
	padding: 3px 5px;
	font-weight: bold;
	text-transform: uppercase;
	color: #ddd;
	background-color: #222;
	cursor: pointer;

	&:hover {
		filter: invert(0.2);
	}
`;

export default ModalForm;

export const mwForm = createRef();
