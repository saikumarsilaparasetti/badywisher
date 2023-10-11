const router = require("express").Router();
const { wishController } = require("../controllers");
router.post("/add", wishController.createWish);
router.post("/getall", wishController.getAll);
module.exports = router;
