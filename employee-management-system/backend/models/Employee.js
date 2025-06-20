const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  firstName: {
    type: String,
    required: [true, 'Please add first name'],
    trim: true,
    maxlength: [50, 'First name cannot be more than 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Please add last name'],
    trim: true,
    maxlength: [50, 'Last name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  phone: {
    type: String,
    required: [true, 'Please add phone number'],
    match: [/^\+?[\d\s-()]+$/, 'Please add a valid phone number']
  },
  department: {
    type: String,
    required: [true, 'Please add department'],
    enum: ['IT', 'HR', 'Finance', 'Marketing', 'Operations', 'Sales']
  },
  position: {
    type: String,
    required: [true, 'Please add position'],
    trim: true
  },
  salary: {
    type: Number,
    required: [true, 'Please add salary'],
    min: [0, 'Salary cannot be negative']
  },
  hireDate: {
    type: Date,
    required: [true, 'Please add hire date'],
    default: Date.now
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'terminated'],
    default: 'active'
  },
  photo: {
    type: String,
    default: 'no-photo.jpg'
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  emergencyContact: {
    name: String,
    relationship: String,
    phone: String
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Virtual for full name
employeeSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Auto-generate employee ID
employeeSchema.pre('save', async function (next) {
  if (!this.isNew) {
    return next();
  }

  const count = await this.constructor.countDocuments();
  this.employeeId = `EMP${String(count + 1).padStart(4, '0')}`;
  next();
});

// Indexes for better performance
employeeSchema.index({ department: 1 });
employeeSchema.index({ status: 1 });

module.exports = mongoose.model('Employee', employeeSchema);
