import express from 'express';

//import CRUD functions from controller Profile
import { getProfiles, getProfile, postProfile, deleteProfile, updateProfile } from '../Controllers/Profile.js';

const router = express.Router();

router.get("/", getProfiles);
router.post("/", postProfile);
router.get("/:id", getProfile);
router.delete("/:id", deleteProfile);
router.patch("/:id", updateProfile);

export default router;