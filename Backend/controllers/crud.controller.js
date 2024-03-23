const Data = require('../models/data.model');

// Create operation
exports.createData = async (req, res) => {
    try {
        const newData = req.body;
        const createdData = await Data.create(newData);
        res.status(201).json(createdData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create data.', details: error.message });
    }
};

// Read operation
exports.getData = async (req, res) => {
    try {
        
        const data = await Data.find();
        res.json(data);
        console.log(data)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data.', details: error.message });
    }
};

exports.getDataById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Data.findById(id);
        if (!data) {
            return res.status(404).json({ error: 'Data not found.' });
        }
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data.', details: error.message });
    }
};

// Update operation
exports.updateData = async (req, res) => {
    try {
        const { id } = req.params;
        const newData = req.body;
        const updatedData = await Data.findByIdAndUpdate(id, newData, { new: true });
        res.json({ message: 'Data updated successfully.', data: updatedData });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update data.', details: error.message });
    }
};

// Delete operation
exports.deleteData = async (req, res) => {
    try {
        const { id } = req.params;
        await Data.findByIdAndDelete(id);
        res.json({ message: 'Data deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete data.', details: error.message });
    }
};
