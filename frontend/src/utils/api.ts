
import { Department, Employee } from '../models/Models'
import { HTTPMethod, Service, Request, request } from './_abstract'



const Requests = {
    //fixed this typo from singular departments to plural
    departments: new Request<Department[]>(HTTPMethod.get, "v1/departments"),
    employees: new Request<Employee[]>(HTTPMethod.get, 'v1/employees')
}

class Backend implements Service {
    baseUrl = process.env.REACT_APP_API_HOST

    async listEmployees(): Promise<Employee[]> {
        return request(this, Requests.employees).call()
    }

    async listDepartments(): Promise<Department[]> {
        return request(this, Requests.departments).call()
    }

    //added this method to get the employees for a given department
    //the Request object had to be made within the method because it needs the departmentId
    //cannot be done in the Requests object because it is not a constant
    async listDepartmentEmployees(departmentId: string): Promise<Employee[]> {
        const departmentDetailsRequest = new Request<Employee[]>(HTTPMethod.get, `v1/departments/${departmentId}`)
        return request(this, departmentDetailsRequest).call()
    }

    async getEmployee(employeeId: string): Promise<Employee> {
        //filter out the employee with the given id
        const employee = (await this.listEmployees()).filter(employee => employee.id === employeeId)[0]
        //if the employee is not found, throw an error
        if (!employee) {
            throw new Error(`Employee with id ${employeeId} not found`)
        }
        return employee
    }
}


export default new Backend()