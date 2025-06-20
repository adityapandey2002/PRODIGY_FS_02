const Employee = require('../models/Employee');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all employees
// @route   GET /api/employees
// @access  Private
exports.getEmployees = async (req, res, next) => {
  try {
    let query;

    // Copy req.query
    const reqQuery = { ...req.query };

    // Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit'];

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);

    // Create query string
    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    // Finding resource
    query = Employee.find(JSON.parse(queryStr)).populate('createdBy', 'name email');

    // Select Fields
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Employee.countDocuments(JSON.parse(queryStr));

    query = query.skip(startIndex).limit(limit);

    // Executing query
    const employees = await query;

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }

    res.status(200).json({
      success: true,
      count: employees.length,
      pagination,
      data: employees
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single employee
// @route   GET /api/employees/:id
// @access  Private
exports.getEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email');

    if (!employee) {
      return next(new ErrorResponse(`Employee not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
      success: true,
      data: employee
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new employee
// @route   POST /api/employees
// @access  Private (Admin/HR)
exports.createEmployee = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.createdBy = req.user.id;

    const employee = await Employee.create(req.body);

    res.status(201).json({
      success: true,
      data: employee
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update employee
// @route   PUT /api/employees/:id
// @access  Private (Admin/HR)
exports.updateEmployee = async (req, res, next) => {
  try {
    // Add updated by user
    req.body.updatedBy = req.user.id;

    let employee = await Employee.findById(req.params.id);

    if (!employee) {
      return next(new ErrorResponse(`Employee not found with id of ${req.params.id}`, 404));
    }

    employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: employee
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete employee
// @route   DELETE /api/employees/:id
// @access  Private (Admin/HR)
exports.deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return next(new ErrorResponse(`Employee not found with id of ${req.params.id}`, 404));
    }

    await employee.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Search employees
// @route   GET /api/employees/search
// @access  Private
exports.searchEmployees = async (req, res, next) => {
  try {
    const { q, department, status } = req.query;

    let searchQuery = {};

    if (q) {
      searchQuery.$or = [
        { firstName: { $regex: q, $options: 'i' } },
        { lastName: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } },
        { employeeId: { $regex: q, $options: 'i' } }
      ];
    }

    if (department) {
      searchQuery.department = department;
    }

    if (status) {
      searchQuery.status = status;
    }

    const employees = await Employee.find(searchQuery)
      .populate('createdBy', 'name email')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: employees.length,
      data: employees
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get employee statistics
// @route   GET /api/employees/stats
// @access  Private (Admin/HR)
exports.getEmployeeStats = async (req, res, next) => {
  try {
    const stats = await Employee.aggregate([
      {
        $group: {
          _id: '$department',
          count: { $sum: 1 },
          avgSalary: { $avg: '$salary' },
          totalSalary: { $sum: '$salary' }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    const statusStats = await Employee.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalEmployees = await Employee.countDocuments();
    const activeEmployees = await Employee.countDocuments({ status: 'active' });

    res.status(200).json({
      success: true,
      data: {
        departmentStats: stats,
        statusStats,
        totalEmployees,
        activeEmployees
      }
    });
  } catch (error) {
    next(error);
  }
};
