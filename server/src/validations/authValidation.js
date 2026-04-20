export const LoginValidationSchema ={
    email:{
        notEmpty:{
            errorMessage: "Email Id msut not be empty"
        },
        isEmail:{
            errorMessage: "Invalid Email"
        },
        normalizeEmail: true,
        trim: true,
    },
    password:{
        notEmpty:{
            errorMessage: "Password must not be empty"
        },
        isLength:{
            options: {min: 8},
            errorMessage: "Password must be at least 8 characters long"
        }
    }
}

export const SignUpValidationSchema={
    name:{
        notEmpty:{
            errorMessage: "Name must not be empty"
        },
        isLength:{
            options: {min: 3},
            errorMessage: "Name must be at least 3 characters long"
        },
        trim: true
    },
     email:{
        notEmpty:{
            errorMessage: "Email Id msut not be empty"
        },
        isEmail:{
            errorMessage: "Invalid Email"
        },
        normalizeEmail: true,
        trim: true,
    },
    password:{
        notEmpty:{
            errorMessage: "Password must not be empty"
        },
        isLength:{
            option: {min: 8},
            errorMessage: "Password must be at least 8 characters long"
        }
    },
    mobile:{
        notEmpty:{
            errorMessage: "Mobile number must not be empty"
        },
        isMobilePhone:{
            options: ['en-IN'],
            errorMessage: "Invalid mobile number"
        },
        isLength:{
            options: {min: 10},
            errorMessage: "Mobile number must be at least 10 digits long"
        }
    },
    role:{
        notEmpty:{
            errorMessage: "Role must not be empty"
        },
        isIn:{
            options: [["user","admin"]],
            errorMessage: "Role must be either user or admin"
        },
        isString:{
            errorMessage: "Role must be String"
        }
    }
}