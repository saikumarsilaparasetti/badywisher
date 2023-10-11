const router = require("express").Router();

router.use("/wish", require("./wishRoutes"));

module.exports = router;
