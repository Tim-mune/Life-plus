import  Jwt  from "jsonwebtoken";
// import { Unauthenticated } from "../errors.js";
import { Unauthenticated } from "../errors/index.js";
const auth=async(req,res,next)=>{
    const authToken=req.headers.authorization
    if(!authToken && authToken.startsWith('Bearer')){
        throw new Unauthenticated('failed authentication')
    }
    try {
    const token =authToken.split(' ')[1]
    const payload=Jwt.verify(token,process.env.JWT_SECRET)
    req.user=payload.userId
    next()
    } catch (error) {
        throw new Unauthenticated('authentication failed')
    }
    

}
export default auth