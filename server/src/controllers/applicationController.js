import Application from "../models/application.model.js";
import Job from "../models/job.model.js";

export const getAllApplications = async (req, res) => {
  try {
    const jobs = await Job.find({ createdBy: req.user.id });
    const jobIds = jobs.map(job => job._id);
    const applications = await Application.find({ jobId: { $in: jobIds } }).populate("userId", "name email mobile").populate("jobId", "company role");
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const result = applications.map(app => ({
      ...app.toObject(),
      resume: app.resume ? `${baseUrl}/${app.resume}` : null
    }))
    res.status(200).json({ total: applications.length, applications: result })
  }
  catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const applyJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const job = await Job.findById(jobId)
    if (!job) {
      return res.status(404).json({ msg: "Job Not Found" })
    }
    if (new Date() > job.expiryDate) {
      return res.status(400).json({ msg: "Job application period has expired" })
    }

    const exiting = await Application.findOne({ userId: req.user.id, jobId });
    if (exiting) {
      return res.status(400).json({ msg: "You have already applied for this job" })
    }
    const resumePath = req.file ? req.file.path : null;
    const application = await Application.create({
      userId: req.user.id,
      jobId,
      resume: resumePath
    })
    res.status(201).json({ msg: "Applied Successfully", application })
  }
  catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const application = await Application.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!application) {
      return res.status(404).json({ msg: "Application Not Found" })
    }
    res.status(200).json(application)
  }
  catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const getUserApplication = async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.user.id }).populate("userId","name email mobile").populate("jobId", "company role location expiryDate").sort({ createdAt: -1 });
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const result = applications.map(app => ({
      ...app.toObject(),
      resume: app.resume ? `${baseUrl}/${app.resume}` : null
    }))

    res.status(200).json({ total: result.length, applications: result })
  }
  catch (err) {
    res.status(500).json({ error: err.message })
  }
}