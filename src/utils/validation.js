const validator = require('validator');

const validateSignUpData = (req) =>{

    const {
        firstName,
        lastName,
        emailId,
        password,
    } = req.body;

    if(!firstName){
        throw new Error('Please enter your first name')
    }

    else if(!lastName){
        throw new Error('Please enter your last name')
    }

    else if(!validator.isEmail(emailId)){
        throw new Error('Email is not valid')
    }

    else if(!validator.isStrongPassword(password)){
        throw new Error('Please enter a string password')
    }
}

const validateEditProfile = (req)=>{

    const allowedEditFields = ['firstName','lastName',,'gender','age','about','photoUrl','emailId','skills']

    const isAllowedFields = Object.keys(req.body).every((field)=>allowedEditFields.includes(field));

    return isAllowedFields;

}

module.exports = {
    validateSignUpData,
    validateEditProfile
};