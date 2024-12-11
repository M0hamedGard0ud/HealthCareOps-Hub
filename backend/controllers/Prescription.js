import { Prescription } from '../models/prescription.js';

const getAllPrescriptions = async (req, res) => {
  try {
    const prescriptionList = await Prescription.find();
    if (!prescriptionList) {
      return res.status(500).json({ success: false });
    }
    res.status(200).send(prescriptionList);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getPrescriptionById = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id);
    if (!prescription) {
      return res.status(404).json({ success: false, message: 'Prescription not found!' });
    }
    res.send(prescription);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const createPrescription = async (req, res) => {
  try {
    let prescription = new Prescription({
      patemail: req.body.patemail,
      hospitalemail: req.body.hospitalemail,
      doctor_name: req.body.doctor_name,
      patient_name: req.body.patient_name,
      findings: req.body.findings,
      lab_test: req.body.lab_test,
      medicine_1: req.body.medicine_1,
      medicine_2: req.body.medicine_2,
      medicine_3: req.body.medicine_3,
      medicine_4: req.body.medicine_4,
      notes: req.body.notes,
    });

    prescription = await prescription.save();
    if (!prescription) {
      return res.status(400).send('The prescription cannot be created!');
    }
    res.send(prescription);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const deletePrescription = async (req, res) => {
  try {
    const prescription = await Prescription.findByIdAndRemove(req.params.id);
    if (prescription) {
      return res.status(200).json({ success: true, message: 'The prescription is deleted!' });
    } else {
      return res.status(404).json({ success: false, message: 'Prescription not found!' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const updatePrescription = async (req, res) => {
  try {
    const prescription = await Prescription.findByIdAndUpdate(
      req.params.id,
      {
        patemail: req.body.patemail,
        hospitalemail: req.body.hospitalemail,
        doctor_name: req.body.doctor_name,
        patient_name: req.body.patient_name,
        findings: req.body.findings,
        lab_test: req.body.lab_test,
        medicine_1: req.body.medicine_1,
        medicine_2: req.body.medicine_2,
        medicine_3: req.body.medicine_3,
        medicine_4: req.body.medicine_4,
        notes: req.body.notes,
      },
      { new: true }
    );

    if (!prescription) {
      return res.status(400).send('The prescription cannot be updated!');
    }

    res.send(prescription);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const updatePrescriptionStatus = async (req, res) => {
  try {
    const prescription = await Prescription.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      { new: true }
    );

    if (!prescription) {
      return res.status(400).send('The prescription cannot be updated!');
    }

    res.send(prescription);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export {
  getAllPrescriptions,
  getPrescriptionById,
  createPrescription,
  deletePrescription,
  updatePrescription,
  updatePrescriptionStatus
};
