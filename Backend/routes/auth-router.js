const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user-model");
const Subject = require("../models/subject-model");
const Attendance = require("../models/attendance-model");
const authMiddleware = require("../middlewares/auth-middleware")
const { v4: uuidv4 } = require('uuid');

router.route("/").get((req, res) => {
    res.status(200).send("Welcome to server using router");
});

router.route("/register").post(async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const studentId = uuidv4();
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const userCreated = await User.create({ username, email, password, studentId });

        res.status(201).json({
            msg: "Registration successful",
            token: await userCreated.generateToken(),
            userId: userCreated._id.toString(),
            username: userExist.username.toString(),
        });
    } catch (error) {
        console.error("Error during registration:", error); // Log the error
        // res.status(500).json({ msg: "Internal server error" });
        next(error);
    }
});

router.route("/login").post(async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email });

        if (!userExist) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, userExist.password);
        if (isPasswordValid) {
            res.status(200).json({
                message: "Login Successful",
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
                username: userExist.username.toString(),
            });
        } else {
            res.status(401).json({ message: "Invalid email or password " });
        }
    } catch (error) {
        // res.status(500).json({ msg: "Internal server error" });
        next(error);
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await User.find(); // Adjust if you want to limit the fields returned
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/students/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const student = await User.findById(id);
        
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        
        res.status(200).json(student);
    } catch (error) {
        console.error('Error fetching student:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.route("/subjects").post(async (req, res) => {
    try {
        const subject = new Subject(req.body);
        await subject.save();
        res.send('Subject created');
    } catch (error) {
        res.status(500).send(error);
    }
});

router.route("/subjects").get(async (req, res) => {
    try {
        const subjects = await Subject.find().populate('user');
        res.status(200).send(subjects);
    } catch (error) {
        res.status(500).send(error);
    }
});

// router.route("/subjects/me").get(authMiddleware, async (req, res) => {
//     try {
//         const subjects = await Subject.find({ student: req.user._id }).populate('student');
//         res.status(200).json(subjects);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// });


router.route("/subjects/:id").delete(async (req, res) => {
    try {
        const { id } = req.params;
        const deletedSubject = await Subject.findByIdAndDelete(id);

        if (!deletedSubject) {
            return res.status(404).send('Subject not found');
        }

        res.send('Subject deleted successfully');
    } catch (error) {
        res.status(500).send(error);
    }
});



router.route("/subjects/:id/timetable").post(async (req, res) => {
    try {
        const { id } = req.params;
        const { timetable } = req.body;
        const subject = await Subject.findById(id);
        subject.timetable = timetable;
        await subject.save();
        res.send('Timetable uploaded successfully');
    } catch (error) {
        res.status(500).send(error);
    }
});
router.route("/subjects/:id/timetable").get(async (req, res) => {
    try {
        const { id } = req.params; // Extract subject ID from the request parameters
        const subject = await Subject.findById(id); // Find the subject by ID

        // Check if the subject exists
        if (!subject) {
            return res.status(404).send('Subject not found'); // Send a 404 if the subject doesn't exist
        }

        // Return the timetable associated with the subject
        res.json({ timetable: subject.timetable });
    } catch (error) {
        res.status(500).send(error.message); // Send a 500 error if something goes wrong
    }
});

router.route("/subjects/:id/timetable/:entryId").delete(async (req, res) => {
    try {
        const { id, entryId } = req.params;
        const subject = await Subject.findById(id);
        
        if (!subject) {
            return res.status(404).send('Subject not found');
        }

        subject.timetable = subject.timetable.filter(entry => entry._id.toString() !== entryId);
        await subject.save();

        res.send('Timetable entry deleted successfully');
    } catch (error) {
        res.status(500).send(error);
    }
});



router.route("/attendance").post(async (req, res) => {
    try {
        const attendance = new Attendance(req.body);
        await attendance.save();
        res.send('Attendance marked');
    } catch (error) {
        res.status(500).send(error);
    }
});

router.route("/attendance/percentage/:studentId").get(async (req, res) => {
    try {
        const { studentId } = req.params;
        const attendanceRecords = await Attendance.find({ student: studentId });
        const totalClasses = attendanceRecords.length;
        const attendedClasses = attendanceRecords.filter(record => record.status === 'present').length;
        const percentage = (attendedClasses / totalClasses) * 100;
        res.json({ percentage });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
