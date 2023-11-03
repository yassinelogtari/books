const router = require("./task");
const userController=require("../controllers/user")

router.post("/signup",userController.signup)
router.post("/login",userController.login)



module.exports=router