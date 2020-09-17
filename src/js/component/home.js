import React from "react";

//include images into your bundle
/* import { Todolist } from "./todolist.js"; */
import { Apitodolist } from "./apitodolist.js";

//create your first component
export function Home() {
	return (
		<div className="text-center mt-5">
			<h1>MyTasks</h1>
			{/* <Todolist /> */}
			<Apitodolist />
		</div>
	);
}
