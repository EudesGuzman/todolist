import React from "react";

//include images into your bundle
import { NuevaTarea } from "./nuevaTarea";
/* import { Prueba } from "./prueba"; */

//create your first component
export function Home() {
	return (
		<div className="text-center mt-5">
			<h1>MyTasks</h1>
			<NuevaTarea />
		</div>
	);
}
