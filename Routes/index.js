const API_PREFIX = '/api';
let router = require('express').Router();

let userRouter = require('./userRoutes');
let purchaseRouter = require('./purchaseRoutes');

router.use(API_PREFIX, userRouter);
router.use(API_PREFIX, purchaseRouter);

module.exports = router;
