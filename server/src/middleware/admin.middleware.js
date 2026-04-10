const adminMiddleware = async (req,res,next)=>{
    if (req.user.role!=="admin"){
        return res.status(400).json({msg: "Admin Access Only"})
    }
    next();
}

export default adminMiddleware;