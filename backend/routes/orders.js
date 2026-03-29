const express        = require('express');
const router         = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware  = require('../middleware/auth');

// Public — tracking (requires ?email= or ?phone= for ownership verification)
router.get('/tracking/:orderNumber', orderController.getByOrderNumber);

// Admin only
router.get('/',    authMiddleware, orderController.getAll);
router.get('/:id', authMiddleware, orderController.getById);
router.put('/:id/status', authMiddleware, orderController.updateStatus);
router.put('/:id/cargo',  authMiddleware, orderController.updateCargo);

module.exports = router;
