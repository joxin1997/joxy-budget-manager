var userRouter = require('express').Router();
let usercontroller = require('../controllers/userContoller');


userRouter.post('/register',function paramValidation(req,res,next) {
    if(req.body && req.body.username && req.body.password && req.body.first_name){
        next();
    }else{
        res.json({
            info: 'invalid parameters',
            status: 200,
            data: []
        })
    }
}, usercontroller.registeruser);


userRouter.post('/login', usercontroller.loginUser);

module.exports = userRouter;
