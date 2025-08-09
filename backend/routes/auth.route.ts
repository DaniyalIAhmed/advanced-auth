import {Router} from 'express';
import { login, logout, register, verifyMail } from '../controllers/auth.controller';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.get('/logout', logout);
router.post('/verify-email', verifyMail);
// ToDO: 
// router.post('/forgot-password', verifyMail);

export default router;