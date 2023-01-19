import { useEffect, useState } from "react"
import { Department } from "../models/Models"
import api from "../utils/api"
import { Link } from "react-router-dom";


export const DepartmentList = () => {
	const [departments, setDepartments] = useState<Department[] | undefined>()


	useEffect(() => {

		(async () => {
			try {
				setDepartments(await api.listDepartments())
			}
			catch (ex) {
				console.error(ex)
			}
		})()

	}, [])


	if (!departments) {
		return <p>Loading Departments...</p>
	}
	else if (departments.length === 0) {
		return <p>No departments</p>
	}

	return (
		<>
			<h2>Department List</h2>

			<ul>
				{departments.map(d =>
					<li key={d.id}>
						<Link to={`/department/${d.id}`}>{d.name}</Link>
					</li>)}
			</ul>
		</>
	)
}