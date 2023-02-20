import CustomError from "./CustomError.js";
import { StatusCodes } from "http-status-codes";
class Unauthenticated extends CustomError{
    constructor(message){
        super(message)
        this.statusCode=StatusCodes.UNAUTHORIZED
    }
}
export default Unauthenticated