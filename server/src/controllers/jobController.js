import Job from '../models/job.model.js'
import Application from '../models/application.model.js'

export const createJob = async (req,res)=>{
    try 
    {
     const job = await Job.create({
        ...req.body,
        createdBy: req.user.id
     })  
     res.status(201).json(job)
    }
    catch(err)
    {
       res.status(500).json({error: err.message})
    }
}

//GET Applied status for Jobs (User view)
export const getJob = async(req,res)=>{
    try {
        const jobs = await Job.find({
            expiryDate: {$gt: new Date()}
        }).sort({createdAt: -1})
        const applications = await Application.find({userId: req.user.id});
        const appliedJobIds = new Set(applications.map(app=>app.jobId.toString()));
        const reslut= jobs.map(job=>({...job.toObject(),isApplied: appliedJobIds.has(job._id.toString())}))
        res.status(200).json(reslut)
    }
    catch(err){
       res.status(500).json({error: err.message})
    }
}

// ✅ GET ALL JOBS (Admin)
export const getAllAdminJob = async(req,res)=>{
    try
    {
      const userId = req.user.id;
      const jobs = await Job.find({createdBy: userId}).populate("createdBy","name email mobile");
      res.status(200).json(jobs)
    }
    catch(err){
       res.status(500).json({error: err.message})
    }
}
export const updateJob = async (req,res)=>{
    try {
       const job = await Job.findByIdAndUpdate(req.params.id,req.body,{new: true});
       res.status(200).json(job)
    }
    catch(err){
       res.status(500).json({error: err.message})
    }
}

export const deletedJob = async (req,res)=>{
    try {
     await Job.findByIdAndDelete(req.params.id)
     res.status(200).json({msg: "Job Deleted Successfully"})
    }catch(err){
       res.status(500).json({error: err.message})
    }
}