const jwt = require("jsonwebtoken");




const auth =async (req,res,next) => {
  try{
    const token = req.header("Authorization");
    // console.log(token,"mid token")
    if(!token) return res.status(400).json({message : "Invalid authentication"})

    jwt.verify(token,process.env.TOKEN_SECRET,(err,user) => {
      if(err) return res.status(400).json({message : "Invalid authentication"})

      req.user = user

      console.log(user)
      next();
    })
  }catch(err){
    return res.status(500).json({message:err.message})
  }
}


// const userMiddleware = (req,res,next) => {
//
// }
//


module.exports = auth
