const router = require('express').Router();
const Joi = require('joi');


router.post('/',async(req,res) => {
    try{
        const {error} = validate(req.body);
        if(error)
        return res.status(400).send(error.details[0].message);

        const user = await User.findOne({email:req.body.email});
        if(!user)
        return res.status(404).send({Invalid: "Email or password is incorrect"});

        const validPassword = await bcrypt.compare(req.body.password,user.password);
        if(!validPassword){
            return res.status(404).send({Invalid: "Email or password is incorrect"});
        }

        const token = user.generateAuthToken();
        res.status(200).send({  data:token, message:"LoggedIn successfully"});

    }catch(err){
        console.error(err);
        res.status(500).send({message: "Internal server error"});
    }
})

const validate = (data) => {
    const schema = Joi.object({
        email:Joi.string().email().required().label("Email"),
        password:Joi.string().required().label("Password"),
    });

    return schema.validate(data);
}
module.exports = router;