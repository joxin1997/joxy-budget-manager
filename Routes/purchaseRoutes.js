let purchaseRouter = require('express').Router();
const { default: mongoose } = require('mongoose');
let purchaseController = require('../controllers/purchaseController');
const usercontroller = require('../controllers/userContoller');
let jwt = require('jsonwebtoken');
const SECRET = 'thisismysecret';

purchaseRouter.post('/addPurchase',function paramValidation(req,res,next) {
    if(req.body && req.body.purchase && req.body.category && req.body.cost){
        console.log("aaaa",req.headers['verify-token']);
        jwt.verify(req.headers['verify-token'],SECRET,(err,data)=>{
            if(err){
                console.log(err);
            }else{
                console.log("data   :",data.data);
                req.body.user_id = data.data.user_id;
                next();
            }
        })
    }else{
        res.json({  
            info: 'invalid parameters',
            status: 200,
            data: []
        })
    }
},purchaseController.addPurchase);


purchaseRouter.get('/listPurchase', function paramValidation(req, res, next) {
    console.log("aaaa", req.headers['verify-token']);
    jwt.verify(req.headers['verify-token'], SECRET, (err, data) => {
        if (err) {
            console.log(err);
            res.json({
                info:'error in verifying token',
                status: 400
            })
        } else {
            console.log("data   :", data.data);
            req.user_id = data.data.user_id;
            next();
        }
    })
}, purchaseController.listPurchase);

module.exports = purchaseRouter;
