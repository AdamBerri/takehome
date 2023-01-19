import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Employee } from "../models/Models"
import api from "../utils/api"

export const DepartmentDetails = () => {
	const [departments, setDepartments] = useState<Employee[] | undefined>()
	let { id } = useParams<{ id: string }>();
	console.log(id)
	useEffect(() => {

		(async () => {
			try {
				setDepartments(await api.listDepartmentEmployees(id))
			}
			catch (ex) {
				console.error(ex)
			}
		})()

	}, [id])


	if (!departments) {
		return <p>Loading Departments...</p>
	}
	else if (departments.length === 0) {
		return <p>No departments</p>
	}

	return (
		<>
			<h2>Department Details for </h2>
			<ul>
				{departments.map(d => <li key={d.id}>{d.name}</li>)}
			</ul>
		</>
	)
}