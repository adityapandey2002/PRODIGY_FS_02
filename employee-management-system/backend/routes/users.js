const express = require('express');
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  updateProfile,
  getProfile
} = require('../controllers/userController');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// All routes are protected
router.use(protect);

// Profile routes (accessible to all authenticated users)
router.get('/profile', getProfile);
router.put('/profile', updateProfile);

// Admin only routes
router.get('/', authorize('admin'), getUsers);
router.get('/:id', authorize('admin'), getUser);
router.put('/:id', authorize('admin'), updateUser);
router.delete('/:id', authorize('admin'), deleteUser);

module.exports = router;
