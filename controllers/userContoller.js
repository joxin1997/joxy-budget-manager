let userModel = require('../models/userModel')
let jwt = require('jsonwebtoken');
const SECRET = 'thisismysecret';

let usercontroller = {
   async registeruser(req, res, next) {
        try {
            let data = await userModel.users.find({username: req.body.username});
            if(data && data.length){
                res.json({
                    status: 409,
                    info: 'user exist'
                })
            }else{
                let newUser = new userModel.users({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name ? req.body.last_name : '',
                    username: req.body.username,
                    mobile: req.body.mobile ,
                    job: req.body.job,
                    password: req.body.password
                });
                newUser.save().then((data) => {
                    res.json({
                        status: 201,
                        info: "User signed up successfully",
                        data: data
                    })
                }).catch((err) => {
                    console.log(err);
                    res.json({
                        status: 400,
                        info: "Error in user sign up ",
                        data: err
                    })
                });
            }
        } catch (error) {
            console.log("error in catch",error);
        }
    },
    
    async loginUser(req, res, next){
        try {
            console.log("Req body params",req.body);
            let username = req.body.username;
            let password = req.body.password;
            let userDataArray = await userModel.users.find({username: username});
            console.log("user Data Array ",userDataArray);
            if(userDataArray && userDataArray.length){
                let userData = userDataArray[0];
                if(userData.password == password){
                    console.log("Password matched");
                    let data = {
                        first_name: userData.first_name,
                        last_name: userData.last_name,
                        username: userData.username,
                        user_id: userData._id
                    }
                    jwt.sign({data:data}, SECRET,(err,token)=>{
                        if(err){
                            console.log('err',err);
                        }else{
                            console.log('token',token);
                            let response = {
                                token: token
                            }
                            res.json({
                                info: 'login successfull',
                                status: 200,
                                data: response
                            })
                        }
                    })
                }else{
                    res.json({
                        info:"Wrong Credentials",
                        status: 401
                    })
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = usercontroller