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
            options: [["Applied","Interview","Rejected","Offer"]],
            errorMessage: "Status must be one of Applied, Interview, Rejected, Offer"
        }
    }
}