import { Router, Response, Request } from 'express'
const router: Router = Router()

router.get('/v1/departments/:id', (_req: Request, res: Response) => {
    const department_id = _req.params.id
    //added this if statement to check if the department id is valid
    //Did not want to do it this way because its not DRY and debated putting everything in a .json to simulate a database
    //but I decided to keep it simple and just check if the id is valid
    //Also new DATE() made it tedious to put into json
    // ****
    // Realized that I need ot actually provide department details and not just employees. Bandaged this up by havin gthe name of the department pushed on the client side
    // ****
    if (department_id == "2") {
        res.send([
            {
                id: "82338",
                name: "Molly Davis",
                birthday: new Date("1985-09-27"),
                bio: "Molly once found a bug in a compiler",
                departmentId: "2"
            },
            {
                id: "32673",
                name: "François Allende",
                birthday: new Date("1985-09-27"),
                bio: "François is the best QA engineer West of the Susquehanna river.",
                departmentId: "2"
            }
        ])
    }
    else if (department_id == "3") {
        res.send([
            {
                id: "82837",
                name: "Bob Smith",
                birthday: new Date("1985-09-27"),
                bio: "Bob has been programming computers for entirely too long!",
                departmentId: "3"
            },
        ])
    }
    else if (department_id == "4") {
        res.send([
            {
                id: "81832",
                name: "Ada Burr",
                birthday: new Date("1985-10-18"),
                bio: "Ada loves full stack development.",
                departmentId: "4"
            },
            {
                id: "zc",
                name: "Juan Cortez",
                birthday: new Date('1984-09-22'),
                bio: "Juan's been programming computers since the days of ATARI BASIC.",
                departmentId: "4"
            }
        ])
    }
    //throw error if the department id is not valid
    //technically this is not the best way of doing it because it will throw an error if a unsuitable id is passed
    else {
        res.status(404).send({ message: "ID Does Not Exist" })
    }
})


router.get('/v1/departments', (_req: Request, res: Response) => {
    res.send([
        {
            id: 2,
            name: "Full Stack Development",
            employeeIds: ["82338", "32673"]
        },
        {
            id: 3,
            name: "Connected Devices Engineering",
            employeeIds: ["82837"]
        },
        {
            id: 4,
            name: "Android Engineering",
            employeeIds: ["82837"]
        },
    ])
})

router.get('/v1/employees', (_unused: Request, res: Response) => {

    res.send([
        {
            id: "82837",
            name: "Bob Smith",
            birthday: new Date("1985-09-27"),
            bio: "Bob has been programming computers for entirely too long!",
            departmentId: "3"
        },
        {
            id: "81832",
            name: "Ada Burr",
            birthday: new Date("1985-10-18"),
            bio: "Ada loves full stack development.",
            departmentId: "4"
        },
        {
            id: "82338",
            name: "Molly Davis",
            birthday: new Date("1985-09-27"),
            bio: "Molly once found a bug in a compiler",
            departmentId: "2"
        },
        {
            id: "32673",
            name: "François Allende",
            birthday: new Date("1985-09-27"),
            bio: "François is the best QA engineer West of the Susquehanna river.",
            departmentId: "2"
        },
        {
            id: "zc", //I left this as zc but I could have made it a number.
            name: "Juan Cortez",
            birthday: new Date('1984-09-22'), //Changed all of the dates to be datetime objects
            bio: "Juan's been programming computers since the days of ATARI BASIC.",
            departmentId: "4"
        }
    ])
})

export default router