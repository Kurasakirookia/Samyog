const express=require("express")
const router=express.Router();
const {registerUser,loginUser,currentUser}=require("../controllers/authControllers")




router.post("/register",registerUser)
router.post("/login",loginUser)
// const { protect ,adminOnly } = require("../middleware/authMiddleware");


// router.use(protect);
// router.use(adminOnly);


router.get("/current",currentUser)

module.exports=router;