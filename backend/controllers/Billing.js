import { Billing } from '../models/billing.js';

const getAllBillings = async (req, res) => {
  try {
    const billingList = await Billing.find();
    if (!billingList) {
      return res.status(500).json({ success: false });
    } 
    res.status(200).send(billingList);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getBillingById = async (req, res) => {
  try {
    const billing = await Billing.findById(req.params.id);
    if (!billing) {
      return res.status(404).json({ success: false, message: 'Billing not found!' });
    } 
    res.send(billing);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const createBilling = async (req, res) => {
  try {
    let billing = new Billing({
      patemail: req.body.patemail,
      hospitalemail: req.body.hospitalemail,
      patient_name: req.body.patient_name,
      amount: req.body.amount,
      amount_paid: req.body.amount_paid,
      balance: req.body.balance,
    });

    billing = await billing.save();
    if (!billing) {
      return res.status(400).send('The billing cannot be created!');
    }
    res.send(billing);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const deleteBilling = async (req, res) => {
  try {
    const billing = await Billing.findByIdAndRemove(req.params.id);
    if (billing) {
      return res.status(200).json({ success: true, message: 'The billing is deleted!' });
    } else {
      return res.status(404).json({ success: false, message: "Billing not found!" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const updateBilling = async (req, res) => {
  try {
    const billing = await Billing.findByIdAndUpdate(
      req.params.id,
      {        
        patemail: req.body.patemail,
        hospitalemail: req.body.hospitalemail,
        patient_name: req.body.patient_name,
        amount: req.body.amount,
        amount_paid: req.body.amount_paid,
        balance: req.body.balance,
      },
      { new: true }
    );

    if (!billing) {
      return res.status(400).send('The billing cannot be updated!');
    }
    res.send(billing);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export {
  getAllBillings,
  getBillingById,
  createBilling,
  deleteBilling,
  updateBilling
};
