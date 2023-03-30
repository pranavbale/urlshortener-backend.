const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const userSchema = new moongose.Schema({
    firstName:{type: 'String', required: true},
    lastName:{type: 'String', required: true},
    email:{type: 'String', required: true},
    password:{type: 'String', required: true},
})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id}, process.env.JWT_KEY,expiresIn='7d');
    return token;
}

const User = mongoose.model('user',userSchema);

const validate = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().min(3).max(30).required().label("First Name"),
        lastName: Joi.string().min(3).max(30).required().label("Last Name"),
        email: Joi.string().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
    });

    return schema.validate(data);
}

module.exports ={User,validate};


