import ReactDOM from "react-dom";
import React from "react";

export class Prueba extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			todos: [
				{ done: false, title: "Make The bed", id: Math.random() * 10 },
				{ done: false, title: "Wash my hands", id: Math.random() * 10 },
				{ done: false, title: "Eat", id: Math.random() * 10 }
			],

			value: []
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
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

		for (let i = 0; i < arrayTodos.length; i++) {
			if (valor !== arrayTodos[i].title || valor !== "") {
				arrayVacio.splice(i, 0, arrayTodos[i]);
			}
		}
		this.setState({
			todos: arrayVacio
		});

		value: this.state.value = "";
	}

	/* handleSubmit(event) {
		event.preventDefault();
		
		for (let i = 0; i < this.state.todos.length; i++) {
			if (this.state.todos[i].title !== this.state.value) {
				console.log("hola");
			}
			console.log(this.state.todos[i], "todos");
		}

		this.setState({
			todos: this.state.todos.concat({
				done: false,
				title: this.state.value,
				id: Math.random() * 10
			}),

			value: (this.state.value = "")
		});

		return false;
	} */

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

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<label>
						Name:
						<input
							type="text"
							value={this.state.value}
							onChange={this.handleChange}
							placeholder="Añade una nueva tarea"
						/>
					</label>
					<input type="submit" value="Submit" />
				</form>
				<div>
					<h1>todos</h1>
					{/*   Realmente hay que recorrer todo el Array y crear this.state.nombres para poder mostrarlo en el parrafo? */}
					<p>
						<ul>
							{this.state.todos.map((todo, index) => {
								return (
									<li key={index}>
										{todo.title}
										{/* añadimos el boton de cerrar */}
										<button
											onClick={() => this.cerrar(todo)}>
											Cerrar
										</button>
									</li>
								);
							})}
						</ul>
					</p>
				</div>
			</div>
		);
	}
}
