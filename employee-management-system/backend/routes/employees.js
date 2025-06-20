const express = require('express');
const {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  searchEmployees,
  getEmployeeStats
} = require('../controllers/employeeController');

const { protect, authorize } = require('../middleware/auth');
const { validateEmployee, handleValidationErrors } = require('../middleware/validation');

const router = express.Router();

// Public routes (protected but accessible to all authenticated users)
router.use(protect);

router.get('/', getEmployees);
router.get('/search', searchEmployees);
router.get('/stats', authorize('admin', 'hr'), getEmployeeStats);
router.get('/:id', getEmployee);

// Admin/HR only routes
router.post('/', authorize('admin', 'hr'), validateEmployee, handleValidationErrors, createEmployee);
router.put('/:id', authorize('admin', 'hr'), updateEmployee);
router.delete('/:id', authorize('admin', 'hr'), deleteEmployee);

module.exports = router;
