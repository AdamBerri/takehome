import { useEffect, useState } from "react"
import { useParams, useLocation } from "react-router-dom";
import { Employee } from "../models/Models"
import api from "../utils/api"
import { Link } from "react-router-dom";
export const DepartmentDetails = () => {
	const [employees, setEmployees] = useState<Employee[] | undefined>()
	// needed useParams to get the id from the url
	// Had to typescript verify the id is a string with { id: string }
	let { id } = useParams<{ id: string }>();

	// I am aware that if you navigate to this page without going through the department list page, the department name will not show
	// This was bandaged after not including department details in the server response (see comment there)
	let body = useLocation<any>().state ?? "";
	let department_name: string = (body) ? body.name : "";

	useEffect(() => {

		(async () => {
			try {
				setEmployees(await api.listDepartmentEmployees(id))
			}
			catch (ex) {
				console.error(ex)
			}
		})()

	}, [id])


	if (!employees) {
		return <p>ID does not Exist</p>
	}
	else if (employees.length === 0) {
		return <p>No departments</p>
	}

	return (
		<>
			<h1>Employees in {department_name} ID: {id}</h1>
			<ul>
				{employees.map(d =>
					<li key={d.id}>
						{/* Didn't want to also put employee details there so I just said let me link directly to the employee deatail page from here */}
						<Link to={`/employee/${d.id}`}>{d.name}</Link>
					</li>)}
			</ul>
		</>
	)
}