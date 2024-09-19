const express = require('express');
const Attendance = require('../models/Attendance');
const router = express.Router();

// Add an attendance record
router.post('/add', async (req, res) => {
    const { employeeName, employeeID, department, attendanceDate, inTime, outTime, workHours } = req.body;

    try {
        const newRecord = new Attendance({ employeeName, employeeID, department, attendanceDate, inTime, outTime, workHours });
        await newRecord.save();
        res.status(201).json({ message: 'Attendance record added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding attendance record' });
    }
});

// Get all attendance records
router.get('/', async (req, res) => {
    try {
        const records = await Attendance.find();
        res.json(records);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching attendance records' });
    }
});

module.exports = router;
