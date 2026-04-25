export const LoginValidationSchema ={
    email:{
        isEmail:{
            errorMessage: "Invalid Email"
        },
        notEmpty:{
            errorMessage: "Email Id is required"
        },
        normalizeEmail: true,
        trim: true,
    },
    password:{
        isLength:{
            options: {min: 8},
            errorMessage: "Password must be at least 8 characters long"
        },
        notEmpty:{
            errorMessage: "Password is required"
        },
    }
}

export const SignUpValidationSchema={
    name:{
        isLength:{
            options: {min: 3},
            errorMessage: "Name must be at least 3 characters long"
        },
        notEmpty:{
            errorMessage: "Name is required"
        },
        trim: true
    },
     email:{
         isEmail:{
            errorMessage: "Invalid Email"
        },
        notEmpty:{
            errorMessage: "Email Id is required"
        },
        normalizeEmail: true,
        trim: true,
    },
    password:{
        isLength:{
            options: {min: 8},
            errorMessage: "Password must be at least 8 characters long"
        },
        notEmpty:{
            errorMessage: "Password is required"
        }
    },
    mobile:{
        isMobilePhone:{
            options: ['en-IN'],
            errorMessage: "Invalid mobile number"
        },
        isLength:{
            options: {min: 10,max: 10},
            errorMessage: "Mobile number must be at least 10 digits long"
        },
        notEmpty:{
            errorMessage: "Mobile number is required"
        },
    },
    role:{
        isIn:{
            options: [["user","admin"]],
            errorMessage: "Role must be either user or admin"
        },
        notEmpty:{
            errorMessage: "Role is required"
        },
        isString:{
            errorMessage: "Role must be String"
        }
    }
}