import { Appointment } from '../models/appointment.js';
import moment from 'moment';
import { generateAvailableSlots } from '../utils/slotGenerator.js';
import { Hospital } from '../models/hospital.js';

// Get available time slots for a specific date
const getAvailableSlots = async (req, res) => {
    const { appointment_date, name } = req.query;

    if (!appointment_date || !name) {
        return res.status(400).json({ success: false, message: 'Please provide a valid appointment date and hospital email.' });
    }

    try {
        const appointmentDate = moment(appointment_date, 'YYYY-MM-DD', true);
        if (!appointmentDate.isValid()) {
            return res.status(400).json({ success: false, message: 'Invalid appointment date format.' });
        }

        const hospital = await Hospital.findOne({ name });
        if (!hospital) {
            return res.status(404).json({ success: false, message: 'Hospital not found.' });
        }

        const bookedAppointments = await Appointment.find({
            appointment_date: {
                $gte: appointmentDate.startOf('day').toDate(),
                $lt: appointmentDate.endOf('day').toDate(),
            },
        });

        const bookedSlots = bookedAppointments.map(appointment => appointment.timeslot);
        const availableTimeSlots = generateAvailableSlots(hospital.timing, bookedSlots);

        res.status(200).json({
            success: true,
            availableSlots: availableTimeSlots,
        });
    } catch (error) {
        console.error('Error fetching available slots:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching available slots.',
        });
    }
};

const getAllAppointments = async (req, res) => {
    try {
        const appointmentList = await Appointment.find();
        if (!appointmentList) {
            res.status(500).json({ success: false });
        }
        res.status(200).send(appointmentList);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const getAppointmentById = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ success: false, message: 'Appointment not found!' });
        }
        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Create a new appointment
const createAppointment = async (req, res) => {
    const {
        patemail, hospitalemail, doctor_name, patient_name,
        reason, appointment_date, timeslot,
        address, city, phone
    } = req.body;

    if (!patemail || !hospitalemail || !doctor_name ||
        !patient_name || !reason || !appointment_date ||
        !timeslot || !address || !city || !phone) {
        return res.status(400).json({ message: 'Please provide all the required fields.' });
    }

    try {
        const appointmentDate = moment(appointment_date).toDate();

        const existingAppointment = await Appointment.findOne({
            appointment_date: appointmentDate,
            timeslot,
        });

        if (existingAppointment) {
            return res.status(400).json({ message: 'The selected time slot is already booked.' });
        }

        const newAppointment = new Appointment({
            patemail,
            hospitalemail,
            patient_name,
            doctor_name,
            reason,
            appointment_date,
            timeslot,
            address,
            city,
            phone,
        });

        await newAppointment.save();
        res.status(201).json({ message: 'Appointment booked successfully', appointment: newAppointment });
    } catch (error) {
        console.error('Error booking appointment:', error);
        res.status(500).json({ message: 'Server error while booking appointment.' });
    }
};

const updateAppointmentStatus = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );

        if (!appointment) {
            return res.status(400).send('The appointment cannot be updated!');
        }

        res.send(appointment);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const deleteAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndRemove(req.params.id);
        if (!appointment) {
            return res.status(404).json({ success: false, message: 'Appointment not found!' });
        }
        res.status(200).json({ success: true, message: 'The appointment has been deleted!' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export {
    getAvailableSlots,
    getAllAppointments,
    getAppointmentById,
    createAppointment,
    updateAppointmentStatus,
    deleteAppointment
};
