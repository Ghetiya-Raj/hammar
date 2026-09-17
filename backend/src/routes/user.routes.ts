import { Router } from 'express';

import { authenticate } from '../auth/auth.middleware.js';

import {
  getMyProfile,
  updateMyProfile,
  uploadMyAvatar,
} from '../controllers/user.controller.js';

import multer from 'multer';

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

router.get('/me', authenticate, getMyProfile);

router.patch('/me', authenticate, updateMyProfile);

router.post(
  '/me/avatar',
  authenticate,
  upload.single('avatar'),
  uploadMyAvatar,
);

export default router;
