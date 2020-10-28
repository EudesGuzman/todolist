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
		let valor = this.state.value;
		let arrayVacio = [];
		let newTodo = { done: false, title: valor, id: Math.random() * 10 };
		arrayVacio.push(newTodo);

		let arrayTodos = this.state.todos;

		if (this.state.value == "" || this.state.value == " ") {
			for (let i = 0; i < arrayTodos.length; i++) {
				if (valor !== arrayTodos[i].title) {
					arrayVacio.splice(i, 0, arrayTodos[i]);
				}
			}
			arrayVacio.pop();
		} else {
			for (let i = 0; i < arrayTodos.length; i++) {
				if (valor !== arrayTodos[i].title) {
					arrayVacio.splice(i, 0, arrayTodos[i]);
				}
			}
		}

		this.setState({
			todos: arrayVacio,
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
	/* 	enviar(e) {
		let obj = {};
		if (e.key === "Enter") {
			for (let i = 0; i < this.state.todos.length; i++) {
				if (this.state.value !== this.state.todos[i].title) {
					console.log(i);
					console.log(this.state.todos);
					console.log(this.state.value);
				}
			};
			// this.setState({
			// 		todos: addArray
			// 	});
		}
    } */

	enviar(e) {
		let obj = {};
		if (e.key === "Enter") {
			let valor = this.state.value;
			let arrayVacio = [];
			let newTodo = { done: false, title: valor, id: Math.random() * 10 };
			arrayVacio.push(newTodo);

			let arrayTodos = this.state.todos;

			if (this.state.value == "" || this.state.value == " ") {
				for (let i = 0; i < arrayTodos.length; i++) {
					if (valor !== arrayTodos[i].title) {
						arrayVacio.splice(i, 0, arrayTodos[i]);
					}
				}
				arrayVacio.pop();
			} else {
				for (let i = 0; i < arrayTodos.length; i++) {
					if (valor !== arrayTodos[i].title) {
						arrayVacio.splice(i, 0, arrayTodos[i]);
					}
				}
			}

			this.setState({
				todos: arrayVacio,
				value: ""
			});
		}
	}

	render() {
		return (
			<div>
				<label>
					<input
						type="text"
						value={this.state.value}
						onChange={this.handleChange}
						placeholder="Añade una nueva tarea"
						onKeyPress={e => {
							{
								this.enviar(e);
							}
						}}
					/>
				</label>

				<div>
					<h1>todos</h1>

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
										Cerrar
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
