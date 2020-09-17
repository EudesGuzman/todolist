import React from "react";

export class Apitodolist extends React.Component {
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
		this.cerrar = this.cerrar.bind(this);
	}

	componentDidMount() {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/eu", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				console.log(resp.ok); // will be true if the response is successfull
				console.log(resp.status); // the status code = 200 or code = 400 etc.
				//console.log(resp.text()); // will try return the exact result as string
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				//here is were your code should start after the fetch finishes
				console.log(data); //this will print on the console the exact object received from the server
				//this.setState({ todos: data });
				this.todos = data;
			})
			.catch(error => {
				//error handling
				console.log(error);
			});
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

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<label>
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

					<ul>
						{this.state.todos.map((todo, index) => {
							return (
								<li key={index}>
									{todo.title}
									<button onClick={() => this.cerrar(todo)}>
										Cerrar
									</button>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		);
	}
}

//import ReactDOM from "react-dom";
/* Haz que tu TODO List se sincronice con la API de backend cada vez que se agregue o elimine una tarea.
Agregue un botón de limpieza de todas las tareas que eliminará toda la lista del servidor y actualizará la lista vacía en el front-end.
Hay 3 momentos críticos en la línea de tiempo de la aplicación (denominado El tiempo de ejecución) para centrarse en su integración:

Después de que la lista se carga vacía por primera vez (componentDidMount): debes obtener (GET) los datos de la API y actualizar las tareas cuando la información finalmente llegue.
Cuando se agrega una nueva tarea: debes PONER (PUT) la nueva lista en el servidor.
Cuando se elimina una tarea: Debes PONER (PUT) la nueva lista en el servidor. */

/*  PISTA PUT

fetch('http://assets.breatheco.de/apis/fake/todos/user/alesanchezr', {
      method: "PUT",
      body: JSON.stringify(todos),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
        console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
        console.log(resp.status); // el código de estado = 200 o código = 400 etc.
        console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
        return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
    })
    .then(data => {
        //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
    })
    .catch(error => {
        //manejo de errores
        console.log(error);
    });

    */
