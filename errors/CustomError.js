import {StatusCodes} from 'http-status-codes'
class CustomError extends Error{
    constructor(message){
        super(message)
    }
}
export default CustomError