import { Labtest } from '../models/labtest.js';

const getAllLabtests = async (req, res) => {
  try {
    const labtestList = await Labtest.find();
    res.status(200).send(labtestList);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getLabtestById = async (req, res) => {
  try {
    const labtest = await Labtest.findById(req.params.id);
    if (!labtest) {
      return res.status(404).json({ success: false, message: 'Labtest not found!' });
    }
    res.status(200).send(labtest);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const createLabtest = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).send('No file in the request');
    
    const fileName = file.filename;
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

    let labtest = new Labtest({
      patemail: req.body.patemail,
      labemail: req.body.labemail,
      hospitalemail: req.body.hospitalemail,
      patient_name: req.body.patient_name,
      test_name: req.body.test_name,
      range: req.body.range,
      actual_range: req.body.actual_range,
      level: req.body.level,
      date: req.body.date,
      report: `${basePath}${fileName}`, // Store the file path (PDF or image)
    });

    labtest = await labtest.save();
    if (!labtest) return res.status(400).send('The labtest cannot be created!');
    res.status(201).send(labtest);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const deleteLabtest = async (req, res) => {
  try {
    const labtest = await Labtest.findByIdAndRemove(req.params.id);
    if (!labtest) return res.status(404).json({ success: false, message: 'Labtest not found!' });
    res.status(200).json({ success: true, message: 'The labtest is deleted!' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateLabtest = async (req, res) => {
  try {
    const labtest = await Labtest.findByIdAndUpdate(
      req.params.id,
      {
        patemail: req.body.patemail,
        labemail: req.body.labemail,
        hospitalemail: req.body.hospitalemail,
        patient_name: req.body.patient_name,
        test_name: req.body.test_name,
        range: req.body.range,
        actual_range: req.body.actual_range,
        level: req.body.level,
        date: req.body.date,
      },
      { new: true }
    );

    if (!labtest) return res.status(400).send('The labtest cannot be updated!');
    res.status(200).send(labtest);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateLabtestReport = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).send('No file uploaded');

    const fileName = file.filename;
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

    const updatedLabtest = await Labtest.findByIdAndUpdate(
      req.params.id,
      { report: `${basePath}${fileName}` },
      { new: true }
    );

    if (!updatedLabtest) return res.status(404).json({ success: false, message: 'Labtest not found!' });
    res.status(200).json({ success: true, message: 'Labtest report updated successfully', labtest: updatedLabtest });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export {
  getAllLabtests,
  getLabtestById,
  createLabtest,
  deleteLabtest,
  updateLabtest,
  updateLabtestReport
};
