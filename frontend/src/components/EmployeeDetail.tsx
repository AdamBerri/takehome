import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Employee } from "../models/Models"
import api from "../utils/api"


export const EmployeeDetail = () => {
	const [employee, setEmployee] = useState<Employee | undefined>()
	// needed useParams to get the id from the url
	// Had to typescript verify the id is a string with { id: string }
	let { id } = useParams<{ id: string }>();

	useEffect(() => {

		(async () => {
			try {
				setEmployee(await api.getEmployee(id))
			}
			catch (ex) {
				console.error(ex)
			}
		})()

	}, [id])

	if (!employee) {
		return <p>ID does not Exist</p>
	}

	return (
		// could have made this look better by adding bolded text or using a table but I wanted to keep it simple
		<>
			<h2>Employee Detail</h2>
			<ul>
				{employee?.name}
			</ul>
			<ul>
				Department ID: {employee?.departmentId}
			</ul>
			<ul>
				Bio: {employee?.bio}
			</ul>
			<ul>
				Employee Birthday: {employee?.birthday}
			</ul>
			<ul>
				Employee ID: {employee?.id}
			</ul>
		</>
	)
}