const router = require("express").Router();
const OrderController = require("../controllers/orderController");

router.post("/", OrderController.payment);

module.exports = router;
