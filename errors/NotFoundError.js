import {StatusCodes} from 'http-status-codes'
import CustomError from "./CustomError.js";
class Not_Found extends CustomError{
    constructor(message){
        super(message)
        this.statusCode=StatusCodes.NOT_FOUND
    }
}
export default Not_Found