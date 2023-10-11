const express = require('express');
const { createJournal, getJournalDetails, updateJournal, getAllJournals, deleteJournal } = require('../controllers/journalController');
const { isAuthenticatedUser } = require('../middlewares/auth');

const router = express.Router();

router.route('/journal/create').post(createJournal);
router.route("/journal/fetchAll").get(getAllJournals);
router.route('/journal/:id').get(getJournalDetails);
router.route('/journal/:id').put(updateJournal);
router.route('/journal/:id').delete(deleteJournal);

module.exports = router;