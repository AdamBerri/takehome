import { Request, Response, NextFunction } from 'express'
import { HTTPError, notFound } from '../lib/errors'


export const fourOhFourHandler = (_req: Request, _res: Response, next: NextFunction) => {
    next(notFound)
}


/**
 * Any error orchestration goes here
 * @param error - The error passed from previous routes
 */
export const catchAll = (error: Error, _req: Request, res: Response, _next: NextFunction) => {

    let code = (<HTTPError>error).code || 500

    res.status(code).send({
        message: error.message,
        // stack: error.stack
    })
}


export const cors = (req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET')

    if (req.method == 'OPTIONS' || req.method == 'HEAD') { return res.status(200).end() }

    // Do a 5 second timeout if the request is not processed
    setTimeout(() => {
        if (!res.headersSent) {
            res.status(408).send({ message: "Request timed out" })
        }
    }, 5000)
    next()
}