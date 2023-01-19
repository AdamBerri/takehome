import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Employee } from "../models/Models"
import api from "../utils/api"
import { Link } from "react-router-dom";
export const DepartmentDetails = () => {
	const [employees, setEmployees] = useState<Employee[] | undefined>()
	let { id } = useParams<{ id: string }>();

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
			<h2>Employees in Department {id}</h2>
			<ul>
				{employees.map(d =>
					<li key={d.id}>
						<Link to={`/employee/${d.id}`}>{d.name}</Link>
					</li>)}
			</ul>
		</>
	)
}