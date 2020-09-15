import ReactDOM from "react-dom";
import React from "react";
//import React, { useState, useEffect } from "react";

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
							onChange={this.handleChange}
							placeholder="Añade una nueva tarea"
						/>
					</label>
					<input type="submit" value="Submit" />
				</form>
				<div>
					<h1>todos</h1>
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
