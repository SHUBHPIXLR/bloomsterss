const Journal = require('../models/journalModel');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');

// Create Journal
exports.createJournal = asyncErrorHandler(async (req, res, next) => {
    const newJournal = req.body;
    const journal = await Journal.create(newJournal);
    return res.status(200).json({
        status: true,
        message: "Journal Created Successfully",
        data: journal
    })
});

// Get All Journals --ADMIN
exports.getAllJournals = asyncErrorHandler(async (req, res, next) => {

    const journals = await Journal.find();

    return res.status(200).json({
        status: true,
        message: "All Journals Fetched Successfully",
        data: journals
    });
});

// Update User
exports.updateJournal = asyncErrorHandler( async (req, res, next) => {

    const newJournal = req.body;
    const journalId = req.params.id;
    const updatedJournal = await Journal.findByIdAndUpdate(journalId, newJournal, {new: true})
    return res.status(200).json({
        status: true,
        message: "Journal updated successfully",
        data: updatedJournal
    })
});

// Get Journal Details
exports.getJournalDetails = asyncErrorHandler(async (req, res, next) => {

    const journal = await Journal.findById(req.params.id)

    if (!journal) {
        return res.status(404).json({
            status: false,
            message: "Journal Not Found",
            data: null
        })
    }

    return res.status(200).json({
        status: true,
        message: "Journal Fetch Successfully",
        data: journal
    })

});


// Delete Journal ---
exports.deleteJournal = asyncErrorHandler(async (req, res, next) => {

    const journal = await Journal.findById(req.params.id);

    if (!journal) {
        return res.status(404).json({
            status: false,
            message: "Journal Not Found",
            data: null
        })
    }

    await journal.deleteOne({ _id: req.params.id });

    return res.status(200).json({
        status: true,
        message: "Journal deleted successfully",
    })

});