const express           = require('express');
const router            = express.Router();
const paymentController = require('../controllers/paymentController');
const authMiddleware    = require('../middleware/auth');

router.post('/initiate',            paymentController.initiate);
router.post('/callback',            paymentController.callback);
router.get('/:orderId/status', authMiddleware, paymentController.getStatus);

module.exports = router;
