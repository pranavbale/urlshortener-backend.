const moongose = require('mongoose');

module.exports = ()=>{
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    try{
    moongose.connect(process.env.MONGODB_URI, connectionParams);
    console.log(`DB connected`);
    }catch(err){
        console.log(`Could not connect to DB  ${err}`);
    }
} 