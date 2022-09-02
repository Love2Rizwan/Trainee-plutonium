const jwt = require("jsonwebtoken");

const checkToken = async function(req,res,next){
    let token = req.headers["x-auth-token"]
    if(!token)  return res.send({ status: false, msg: "Please pass a token" })
    const decodedToken = await jwt.verify(token, "functionup-radon")
    if(!decodedToken) return res.send({ status: false, msg: "Invalid token" })
    next()
}
module.exports.checkToken = checkToken