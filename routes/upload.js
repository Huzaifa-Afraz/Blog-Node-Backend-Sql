import express from 'express';
import { uploads } from '../controllers/upload.js';
const router=express.Router();
router.post('/uploads',uploads);
export default router;