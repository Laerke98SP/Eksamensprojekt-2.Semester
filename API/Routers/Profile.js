const express = require('express');

//import CRUD functions from controller Profile

const router = express.Router();


router.get("/", getProfiles);
router.post("/", postProfile);
router.get("/:id", getProfile);
router.delete("/:id", deleteProfile);
router.patch("/:id", updateProfile);


export default router;