import CustomError from "./CustomError.js";
import {StatusCodes} from 'http-status-codes'
class BAD_REQUEST extends CustomError{
constructor(message){
    super(message)
    this.statusCode=StatusCodes.BAD_REQUEST
}
}
export default BAD_REQUEST