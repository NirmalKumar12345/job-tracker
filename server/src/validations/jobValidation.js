export const jobValidaionSchema = {
    company: {
        notEmpty: {
            errorMessage: "Company is required"
        },
        trim: true
    },
    role: {
        notEmpty: {
            errorMessage: "role is required"
        },
        isLength: {
            options: { min: 5 },
            errorMessage: "Role must be at least 5 characters long"
        },
        trim: true
    },
    description: {
        optional: true,
        isLength: {
            options: { min: 10 },
            errorMessage: "Description must be at least 10 characters long"
        }
    },
    location: {
        notEmpty: {
            errorMessage: "location is required"
        },
        trim: true
    },
    expiryDate: {
        notEmpty: {
            errorMessage: "ExpiryDate is required"
        },
        isISO8601: {
            errorMessage: "Invalid date format"
        },
        custom: {
            options: (value) => {
                const today = new Date()
                today.setHours(0, 0, 0, 0); 
                if (new Date(value) <= today) {
                    throw new Error("Expiry must be a future date")
                }
                return true;
            }
        }
    },
    skill:{
        optional: true,
        trim: true
    },
    experience:{
        notEmpty: {
            errorMessage: "Expirence is required"
        },
        trim: true,
        isLength:{
            options: {min: 1},
            errorMessage: "Experience must be valid"
        }
    }
}