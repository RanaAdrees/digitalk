import express from "express";
import { createNewUser, getSingleUser } from "../controllers/userController.js";
const router = express.Router();

// import { verifyUser } from "../utlis/verifyToken.js";

// //update user
// router.put("/:id", verifyUser, updateUser);

// //delete user
// router.delete("/:id", verifyUser, deleteUser);

// //get single user
// router.get("/:id", verifyUser, getSingleUser);

// //get all users
// router.get("/", verifyUser, getAllUser);

router.post("/", createNewUser);
// router.get("/:email", getSingleUser);

export default router;
