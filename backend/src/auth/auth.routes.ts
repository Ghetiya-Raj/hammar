import { Router } from 'express';
import {
  login,
  logout,
  register,
  getCurrentUser,
  logoutAllDevices,
  setupTwoFactorAuth,
  verifyTwoFactorAuth,
  verifyTwoFactorLogin,
} from './auth.controller.js';
import { authenticate, authenticateTwoFactorSetup } from './auth.middleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', authenticate, getCurrentUser);
router.post('/logout-all', authenticate, logoutAllDevices);
router.post('/2fa/setup', authenticateTwoFactorSetup, setupTwoFactorAuth);
router.post('/2fa/verify', authenticateTwoFactorSetup, verifyTwoFactorAuth);
router.post('/2fa/login', verifyTwoFactorLogin);
export default router;
