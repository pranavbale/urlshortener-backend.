const router = require("express").Router();
const res = require("express/lib/response");
const { User, validate } = require("../models/user");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const user = await User.findOne({ email: req.body.email });
    if (user) return res.status(200).send("User already registered");
    generateSalt();
  } catch (err) {
      res.status(500).send({message: "Internal server error"});
  }
});

 async function generateSalt(){
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    await new User({...req.body, password: hashPassword}).save();
    res.status(200).send("User created");

}
module.exports = router;
