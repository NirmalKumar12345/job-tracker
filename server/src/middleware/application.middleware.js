const applicationMiddleware = async (req,res,next)=>{
    if (req.user.role!=="user"){
        return res.status(400).json({msg: "User Access Only"})
    }
    next();
}

export default applicationMiddleware;