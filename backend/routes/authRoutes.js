const express=require("express")
const router=express.Router();
const {registerUser,loginUser,currentUser}=require("../controllers/authControllers")




router.post("/register",registerUser)
router.post("/login",loginUser)
const { protect  } = require("../middleware/authMiddleware");


// router.use(protect);

router.get("/current",protect,currentUser)
// router.use(adminOnly);



module.exports=router;