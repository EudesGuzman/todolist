import React from "react";

export class Apitodolist extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			todos: [],
			value: []
		};
	}

	componentDidMount() {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/eu", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				console.log(data); //this will print on the console the exact object received from the server
				for (let x in data) {
					this.setState({ todos: [...this.state.todos, data[x]] });
				}
				/* this.state.todos = data; */
			})
			.catch(error => {
				console.log(error);
			});
	}

	componentDidUpdate() {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/eu", {
			method: "PUT",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(this.state.todos)
		});
	}

	addToList = e => {
		if (e.key === "Enter") {
			console.log(this.state.value);
			if (e.target.value.split(" ").join("").length > 0) {
				this.setState({
					todos: [
						...this.state.todos,
						{ label: e.target.value, done: false }
					]
				});
			}
			e.target.value = "";
		}
	};

	// Revisar. No siempre se eliminar o añade task

	// Si eliminamos todos los TASK -> error. Se necesita metodo POST.
	// Mejor forma de hacer el post? Como hacer el post si todos = []

	deleteFromList = index => {
		this.setState({
			todos: this.state.todos.filter((item, pos) => pos !== index)
		});
	};

	render() {
		return (
			<div>
				<form>
					<label>
						<input
							type="text"
							placeholder="Añadimos una tarea?"
							onKeyPress={this.addToList}
						/>
					</label>
				</form>
				<div>
					<h1>todos - API</h1>

					<ul>
						{this.state.todos.map((todo, index) => {
							return (
								<li key={index}>
									{todo.label}
									<button
										onClick={() =>
											this.deleteFromList(index)
										}>
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
