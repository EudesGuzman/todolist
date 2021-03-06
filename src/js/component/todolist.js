//import ReactDOM from "react-dom";
/* The delete icon shows only when the task is hovered.
When there is no tasks the list should "No tasks, add a task" */
import React from "react";

export class Todolist extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			todos: [
				{ done: false, title: "Make The bed", id: Math.random() * 10 },
				{ done: false, title: "Wash my hands", id: Math.random() * 10 },
				{ done: false, title: "Eat", id: Math.random() * 10 }
			],

			value: [],
			open: -1
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.cerrar = this.cerrar.bind(this);
	}

	handleChange(event) {
		this.setState({ value: event.target.value });
	}

	handleSubmit(event) {
		event.preventDefault();
		let value = this.state.value;
		let aux = [];
		let newTodo = { done: false, title: value, id: Math.random() * 10 };
		aux.push(newTodo);

		let arrTodos = this.state.todos;

		if (this.state.value == "" || this.state.value == " ") {
			for (let i = 0; i < arrTodos.length; i++) {
				if (value !== arrTodos[i].title) {
					aux.splice(i, 0, arrTodos[i]);
				}
			}
			aux.pop();
		} else {
			for (let i = 0; i < arrTodos.length; i++) {
				if (value !== arrTodos[i].title) {
					aux.splice(i, 0, arrTodos[i]);
				}
			}
		}

		this.setState({
			todos: aux,
			value: ""
		});
	}
	cerrar(todo) {
		let addArray = [];
		for (let i = 0; i < this.state.todos.length; i++) {
			if (todo !== this.state.todos[i]) {
				addArray.splice(i, 1);
				addArray.push(this.state.todos[i]);
			}
		}

		this.setState({
			todos: addArray
		});
	}

	enviar(e) {
		let obj = {};
		if (e.key === "Enter") {
			let value = this.state.value;
			let aux = [];
			let newTodo = { done: false, title: value, id: Math.random() * 10 };
			aux.push(newTodo);

			let arrTodos = this.state.todos;

			if (this.state.value == "" || this.state.value == " ") {
				for (let i = 0; i < arrTodos.length; i++) {
					if (value !== arrTodos[i].title) {
						aux.splice(i, 0, arrTodos[i]);
					}
				}
				aux.pop();
			} else {
				for (let i = 0; i < arrTodos.length; i++) {
					if (value !== arrTodos[i].title) {
						aux.splice(i, 0, arrTodos[i]);
					}
				}
			}

			this.setState({
				todos: aux,
				value: ""
			});
		}
	}

	render() {
		return (
			<div>
				<h1>Todos</h1>
				<label>
					<input
						type="text"
						value={this.state.value}
						onChange={this.handleChange}
						placeholder="Whats need to be done?"
						onKeyPress={e => {
							{
								this.enviar(e);
							}
						}}
					/>
				</label>

				<div>
					<ul>
						{this.state.todos.map((todo, index) => {
							let isOpen =
								this.state.open === index ? true : false;
							return (
								<li
									key={index}
									onMouseEnter={e => {
										this.setState({ open: index });
									}}
									onMouseOut={e => {
										this.setState({ open: -1 });
									}}>
									{todo.title}
									<button
										onClick={() => this.cerrar(todo)}
										key={index}
										onMouseEnter={e => {
											this.setState({ open: index });
										}}
										style={{
											display: isOpen ? "inherit" : "none"
										}}>
										X
									</button>
								</li>
							);
						})}
					</ul>
					<p className="left">{this.state.todos.length} item left</p>
				</div>
			</div>
		);
	}
}
