const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://abishekshell13:Abishek1@cluster0.ki7jt.mongodb.net/attendanceDB?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

const attendanceSchema = new mongoose.Schema({
    employeeName: String,
    employeeID: String,
    department: String,
    attendanceDate: Date,
    inTime: String,
    outTime: String,
    workHours: String,
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

app.post('/add-attendance', async (req, res) => {
    const { employeeName, employeeID, department, attendanceDate, inTime, outTime, workHours } = req.body;
    try {
        const attendance = new Attendance({ employeeName, employeeID, department, attendanceDate, inTime, outTime, workHours });
        await attendance.save();
        res.status(201).send('Attendance record added successfully');
    } catch (err) {
        res.status(500).send('Error saving attendance record');
    }
});

app.get('/attendance', async (req, res) => {
    try {
        const attendanceRecords = await Attendance.find();
        res.json(attendanceRecords);
    } catch (err) {
        res.status(500).send('Error retrieving attendance records');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
