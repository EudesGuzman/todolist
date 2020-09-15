import ReactDOM from "react-dom";
import React from "react";

export class NuevaTarea extends React.Component {
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

		for (let i = 0; i < this.state.todos.length; i++) {
			/* console.log(this.state.value);
            console.log(this.state.todos[i].title); */

			if (this.state.value == this.state.todos[i].title) {
				console.log("es igual");
			} else {
				console.log("no es igual");
			}
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

					<ul>
						{this.state.todos.map((todo, index) => {
							return <li key={index}>{todo.title}</li>;
						})}
					</ul>
				</div>
			</div>
		);
	}
}
