import { Feedback } from '../models/feedback.js';

const getAllFeedbacks = async (req, res) => {
  try {
    const feedbackList = await Feedback.find();
    if (!feedbackList) {
      return res.status(500).json({ success: false });
    }
    res.status(200).send(feedbackList);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ success: false, message: 'Feedback not found!' });
    }
    res.send(feedback);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const createFeedback = async (req, res) => {
  try {
    let feedback = new Feedback({
      patemail: req.body.patemail,
      hospitalemail: req.body.hospitalemail,
      name: req.body.name,
      feedback: req.body.feedback,
    });

    feedback = await feedback.save();

    if (!feedback) {
      return res.status(400).send('The feedback cannot be created!');
    }
    res.send(feedback);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export {
  getAllFeedbacks,
  getFeedbackById,
  createFeedback
};
