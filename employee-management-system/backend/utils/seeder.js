const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

// Load models
const User = require('../models/User');
const Employee = require('../models/Employee');

// Connect to DB
mongoose.connect(process.env.MONGODB_URI);

// Read JSON files
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../_data/users.json`, 'utf-8')
);

const employees = JSON.parse(
  fs.readFileSync(`${__dirname}/../_data/employees.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    await User.create(users);
    await Employee.create(employees);
    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await User.deleteMany();
    await Employee.deleteMany();
    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
