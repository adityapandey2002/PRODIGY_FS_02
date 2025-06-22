require('dotenv').config();
const mongoose = require('mongoose');
const Employee = require('../models/Employee');

const fixEmployeeIds = async () => {
  try {
    // Connect to MongoDB using the environment variable
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected for migration');

    // Get all employees without employeeId
    const employees = await Employee.find({ employeeId: { $exists: false } });
    console.log(`Found ${employees.length} employees without IDs`);

    // Get the highest existing employeeId
    const highestEmployee = await Employee.findOne({ employeeId: { $exists: true } })
      .sort({ employeeId: -1 })
      .lean();

    let nextNumber = 1;
    if (highestEmployee && highestEmployee.employeeId) {
      const currentNumber = parseInt(highestEmployee.employeeId.replace('EMP', ''), 10);
      if (!isNaN(currentNumber)) {
        nextNumber = currentNumber + 1;
      }
    }

    // Update each employee
    for (const employee of employees) {
      const employeeId = `EMP${String(nextNumber).padStart(4, '0')}`;
      await Employee.findByIdAndUpdate(employee._id, { employeeId });
      console.log(`Updated employee ${employee._id} with ID ${employeeId}`);
      nextNumber++;
    }

    console.log('Migration completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
};

fixEmployeeIds(); 