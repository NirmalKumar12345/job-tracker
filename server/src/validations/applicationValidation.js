export const applyJobValidationSchema = {
    jobId: {
        notEmpty: {
            errorMessage: "Job ID is required"
        },
        isMongoId: {
            errorMessage: "Invalid Job ID"
        }
    }
}

export const updateApplicationValidationSchema = {
    status:{
        notEmpty: {
            errorMessage: "Status is required"
        },
        isIn:{
            options: [["Applied","Reviewing","Rejected","Shortlisted"]],
            errorMessage: "Status must be one of Applied, Reviewing, Rejected, Shortlisted"
        }
    }
}